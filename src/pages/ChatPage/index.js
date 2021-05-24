import React, {useEffect, useMemo, useRef, useState} from "react";
import {ChatContainer, Contador, Container, ContentContainer, HeaderContact, Layout, WaitingContainer} from "./style";
import {CheckCircle, Mic, Paperclip, Send, XCircle} from "react-feather";
import api, {listenerMessages} from "../../services/api";
import ImageLoader from "../../assets/hand-smartphone.png";
import ChatComponent from "../../components/ChatPage/ChatComponent";
import ConversasComponent from "../../components/ChatPage/ConversasComponent";
import {defaultKey, getSession, getToken, logout} from "../../services/auth";
import config from "../../util/sessionHeader";
import history from "../../history";
import MicRecorder from "mic-recorder-to-mp3";

const SendMessagePage = () => {
    const dropRef = useRef(null);
    const [allMessages, setAllMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [dados, setDados] = useState([]);
    const [choosedContact, setChoosedContact] = useState([]);
    const [message, setMessage] = useState("");
    const chatRef = useRef(null);
    const messagesEnd = useRef(null);
    const [recordState, setRecordState] = useState(null);
    const [segundos, setSegundos] = useState(0);
    const [minutos, setMinutos] = useState(0);
    const [stop, setStop] = useState(true);
    const [isBlocked, setIsBlocked] = useState(false);
    const recorder = useMemo(() => new MicRecorder({bitRate: 128}), []);

    useEffect(() => {
        async function checkConnection() {
            try {
                await api.get(`${getSession()}/check-connection-session`, config);
                if (defaultKey() === null) {
                    history.push("/");
                } else {
                    await getAllChats();
                }
            } catch (e) {
                logout();
                history.push("/");
            }
        }

        checkConnection();

        return () => {
            setChats([]);
        };
    }, []);

    useEffect(() => {
        if (stop === false) {
            const intervalId = setInterval(() => {
                setSegundos(seconds => {
                    if (seconds >= 59) {
                        zerar();
                        incrementarMinuto();
                    }

                    return seconds + 1;
                });
            }, 1000);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [segundos, stop]);

    listenerMessages((err, data) => {
        if (err) return;

        if (chatRef.current !== null) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }

        if (choosedContact.id !== undefined) {
            if (choosedContact.id._serialized === data.response.chatId || data.response.fromMe && choosedContact.id._serialized === data.response.to) {
                setAllMessages((prevState) => {
                    return [...prevState, data.response];
                });
                scrollToBottom();
            }
        }
    });

    function zerarCronometro() {
        setSegundos(0);
        setMinutos(0);
    }

    const startRecording = () => {
        navigator.getUserMedia({audio: true},
            () => {
                // alert("Permission Granted");
                setIsBlocked(false);
            },
            () => {
                alert("Permission Denied");
                setIsBlocked(true);
            },
        );

        if (isBlocked) {
            alert("Permission Denied");
        } else {
            recorder.start().then(() => {
                setRecordState(true);
                setStop(false);
            }).catch((e) => {
                console.error(e);
            });
        }
    };

    function cancelRecording() {
        // mediaRecorder.stop();

        setRecordState(null);
        setStop(true);
        zerarCronometro();
    }

    const finishRecording = () => {
        setRecordState(null);
        setStop(true);
        zerarCronometro();

        recorder.stop().getMp3().then(([buffer, blob]) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = async function () {
                const base64data = reader.result;
                await api.post(`${getSession()}/send-voice`, {
                    url: base64data,
                    phone: choosedContact.id.user,
                }, config);
            };

            const file = new File(buffer, "audio.mp3", {
                type: blob.type,
                lastModified: Date.now()
            });
            new Audio(URL.createObjectURL(file));

        }).catch((e) => {
            alert("We could not retrieve your message");
            console.log(e);
        });
    };

    function incrementarMinuto() {
        setMinutos((prevState) => prevState + 1);
    }

    function zerar() {
        setSegundos(0);
    }

    async function getAllChats() {
        try {
            const {data} = await api.get(`${getSession()}/all-chats`, config);
            setChats(data.response);
            setDados(data.response);
        } catch (e) {
            const {data} = await api.get(`${getSession()}/all-chats`, config);
            setChats(data.response);
            setDados(data.response);
        }
    }

    const scrollToBottom = () => {
        if (messagesEnd.current !== null) {
            messagesEnd.current.scrollIntoView({behavior: "smooth"});
        }
    };

    async function onClickContact(contact) {
        setChoosedContact(contact);

        try {
            const endpoint = contact.isGroup ? "chat-group-by-id" : "chat-by-id";
            const response = await api.get(`${getSession()}/${endpoint}/${contact.id.user}`, config);
            setAllMessages(response.data.response);
        } catch (e) {
            const response = await api.get(`${getSession()}/chat-by-id/${contact.id.user}`, config);
            setAllMessages(response.data.response);
        }

        scrollToBottom();
    }

    async function sendMessage(e) {
        e.preventDefault();
        if (message !== "" || getSession() !== "") {
            setMessage("");
            scrollToBottom();

            if (!choosedContact.isGroup) {
                await api.post(`${getSession()}/send-message`, {
                    phone: choosedContact.id.user,
                    message: message
                }, config);
            } else {
                await api.post(`${getSession()}/send-message`, {
                    phone: choosedContact.id.user,
                    message: message,
                    isGroup: true
                }, config);
            }
        } else {
            alert("Preencha todos os dados antes de enviar");
        }
    }

    function onChangeAnexo(e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            let filename = "";

            reader.onload = async function (e) {
                const base64 = e.target.result;
                await api.post(`${getSession()}/send-file-base64`, {
                    base64: base64,
                    phone: choosedContact.id.user,
                    message: "",
                    filename: filename
                }, config);
            };

            reader.readAsDataURL(e.target.files[0]);
            filename = e.target.files[0].name;
        }
    }

    function searchChat(e) {
        const {value} = e.target;

        const users = chats.filter((filtro) => {
                if (filtro.name !== undefined && filtro.id._serialized !== undefined) {
                    return filtro.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(value.toLowerCase()) > -1 || filtro.id._serialized.indexOf(value) > -1;
                } else {
                    return [];
                }
            }
        );

        setChats(users);

        if (value === "") {
            setChats(dados);
        }
    }

    return (
        <Layout>
            <Container ref={dropRef}>
                <ContentContainer>
                    <ConversasComponent chats={chats} setChats={setChats} onClickContact={onClickContact}
                                        onSearch={searchChat}/>

                    <ChatContainer>
                        {
                            choosedContact.length <= 0 ?
                                null
                                : (
                                    <HeaderContact>
                                        <div className={"container-info-ctt"}>
                                            <img
                                                src={choosedContact.contact.profilePicThumbObj.eurl === undefined ? "https://pbs.twimg.com/profile_images/1259926100261601280/OgmLtUZJ_400x400.png" : choosedContact.contact.profilePicThumbObj.eurl === null ? `https://ui-avatars.com/api/?name=${choosedContact.name}?background=random` : choosedContact.contact.profilePicThumbObj.eurl}
                                                alt={`${choosedContact.name}`}
                                                loading={"lazy"}
                                                onError={(e) => e.target.src = "https://pbs.twimg.com/profile_images/1259926100261601280/OgmLtUZJ_400x400.png"}
                                            />
                                            <h3>
                                                {choosedContact.name === undefined ? choosedContact.contact.formattedName : choosedContact.name}
                                            </h3>
                                        </div>
                                    </HeaderContact>
                                )
                        }

                        <ul ref={chatRef}>
                            {
                                allMessages.length <= 0 ? (
                                    <WaitingContainer>
                                        <div>
                                            <img src={ImageLoader} alt={"Smartphone"}/>
                                            <h2>
                                                Envie ou receba uma mensagem
                                            </h2>
                                            <p>
                                                Escolha uma sessao ao lado para <b>procurar um contato</b> ou inicie
                                                uma
                                                conversa com <b>qualquer pessoa</b> clicando <a
                                                href={"/contatos"}>aqui</a>
                                            </p>
                                        </div>
                                    </WaitingContainer>
                                ) : (
                                    <div>
                                        {
                                            allMessages.map((message, index) => {
                                                return (
                                                    <li key={index}>
                                                        <ChatComponent
                                                            isMe={message.fromMe ? "right" : "left"}
                                                            session={getSession()}
                                                            token={getToken()}
                                                            message={message}
                                                        />
                                                    </li>
                                                );
                                            })
                                        }
                                    </div>
                                )
                            }

                            <div ref={messagesEnd}/>
                        </ul>

                        <form className={"bottom-container"} onSubmit={(e) => sendMessage(e)}>
                            <label>
                                <input type={"file"} onChange={onChangeAnexo}/>
                                <div className={"attach-info"}>
                                    <Paperclip/>
                                </div>
                            </label>
                            <input
                                placeholder={"Digite uma mensagem..."}
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                }}
                            />

                            {
                                message === "" ? (
                                    recordState === null ? (
                                        <Mic onClick={startRecording}/>
                                    ) : (
                                        <Contador>
                                            <div className={"main-cont"}>
                                                <XCircle onClick={cancelRecording}/>
                                                <div className={"counter"}>
                                                    <p>
                                                        {
                                                            minutos === 0 ? (
                                                                `${segundos}s`
                                                            ) : (
                                                                `${minutos}m ${segundos}s`
                                                            )
                                                        }
                                                    </p>
                                                </div>
                                                <CheckCircle onClick={() => finishRecording()}/>
                                            </div>
                                        </Contador>
                                    )
                                ) : (
                                    <Send type={"submit"} onClick={(e) => sendMessage(e)}/>
                                )
                            }
                        </form>


                    </ChatContainer>
                </ContentContainer>
            </Container>
        </Layout>
    );
};

export default SendMessagePage;