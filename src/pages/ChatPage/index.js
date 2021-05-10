import React, {useEffect, useRef, useState} from "react";
import {ChatContainer, Container, ContentContainer, HeaderContact, Layout, WaitingContainer} from "./style";
import {Paperclip, Send} from "react-feather";
import api, {listenerMessages} from "../../services/api";
import ImageLoader from "../../assets/hand-smartphone.png";
import ChatComponent from "../../components/ChatPage/ChatComponent";
import ConversasComponent from "../../components/ChatPage/ConversasComponent";
import {defaultKey, getSession, getToken, logout} from "../../services/auth";
import config from "../../util/sessionHeader";
import history from "../../history";
import ModalAudioRecord from "./ModalRecordAudio";

const SendMessagePage = () => {
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [choosedContact, setChoosedContact] = useState([]);
    const [message, setMessage] = useState("");
    const chatRef = useRef(null);
    const messagesEnd = useRef(null);
    const [openAudioModal, setOpenAudioModal] = useState(false);
    const dropRef = useRef(null);

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
        dropRef.current.addEventListener("dragenter", dragenter, false);
        dropRef.current.addEventListener("dragleave", dragleave, false);
        dropRef.current.addEventListener("dragover", dragover, false);
        dropRef.current.addEventListener("drop", drop, false);
    }, []);

    function dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function dragleave(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function dragover(e) {
        e.stopPropagation();
        e.preventDefault();

        console.log("teste");
    }

    function drop(e) {
        e.stopPropagation();
        e.preventDefault();

        let dt = e.dataTransfer;
        let files = dt.files;

        handleFiles(files);
    }

    function handleFiles(e) {
        console.log(e);
    }

    async function getAllChats() {
        try {
            const response = await api.get(`${getSession()}/show-all-chats`, config);
            setChats(response.data.response);
        } catch (e) {
            const response = await api.get(`${getSession()}/show-all-chats`, config);
            setChats(response.data.response);
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
            const response = await api.post(`${getSession()}/get-chat-by-id`, {phone: contact.id._serialized}, config);
            setMessages(response.data.response);
        } catch (e) {
            const response = await api.post(`${getSession()}/get-chat-by-id`, {phone: contact.id._serialized}, config);
            setMessages(response.data.response);
        }

        scrollToBottom();
    }

    listenerMessages((err, data) => {
        if (err) return;

        if (chatRef.current !== null) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }

        if (choosedContact.id !== undefined) {
            console.log("");
            if (choosedContact.id._serialized === data.response.chatId || data.response.fromMe && choosedContact.id._serialized === data.response.to) {
                setMessages((prevState) => {
                    return [...prevState, data.response];
                });
                scrollToBottom();
            }
        }
    });

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

    // const handleOpenAudioModal = () => {
    //     setOpenAudioModal(true);
    // };

    const handleCloseAudioModal = () => {
        setOpenAudioModal(false);
    };

    function onChangeAnexo(e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = async function (e) {
                await api.post(`${getSession()}/send-file-base64`, {
                    base64: e.target.result,
                    phone: choosedContact.id.user
                }, config);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    function searchChat(e) {
        let query = e.target.value;

        let users = chats.filter((filtro) => {
                if (filtro.name !== undefined && filtro.id._serialized !== undefined) {
                    return filtro.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(query.toLowerCase()) > -1 || filtro.id._serialized.indexOf(query) > -1;
                } else {
                    return [];
                }
            }
        );

        setChats(users);

        if (query === "") {
            // setChats(data);
        }
    }

    return (
        <Layout>
            <ModalAudioRecord handleClose={handleCloseAudioModal} open={openAudioModal} contact={choosedContact}/>

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
                                messages.length <= 0 ? (
                                    <WaitingContainer>
                                        <div>
                                            <img src={ImageLoader} alt={"Smartphone"}/>
                                            <h2>
                                                Envie ou receba uma mensagem
                                            </h2>
                                            <p>
                                                Escolha uma sessao ao lado para <b>procurar um contato</b> ou inicie uma
                                                conversa com <b>qualquer pessoa</b> clicando <a
                                                href={"/contatos"}>aqui</a>
                                            </p>
                                        </div>
                                    </WaitingContainer>
                                ) : (
                                    <div>
                                        {
                                            messages.map((message, index) => {
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
                            {/*<Mic onClick={() => handleOpenAudioModal()}/>*/}
                            <Send type={"submit"} onClick={(e) => sendMessage(e)}/>
                        </form>
                    </ChatContainer>
                </ContentContainer>
            </Container>
        </Layout>
    );
};

export default SendMessagePage;
