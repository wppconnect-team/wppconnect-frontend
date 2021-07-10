/*
 * Copyright 2021 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {useEffect, useMemo, useRef, useState, useCallback} from "react";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Picker } from "emoji-mart";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  ChatContainer,
  Contador,
  Container,
  ContentContainer,
  HeaderContact,
  Layout,
  WaitingContainer,
  ReplyContainer,
  LoadMoreComponent
} from "./style";
import {
  CheckCircle,
  Mic,
  Paperclip,
  Send,
  Smile,
  XCircle,
  X,
} from "react-feather";
import api from "../../services/api";
import ImageLoader from "../../assets/ic_loader_chat.svg";
import ChatComponent from "../../components/ChatPage/ChatComponent";
import ConversasComponent from "../../components/ChatPage/ConversasComponent";
import {getSession, getToken} from "../../services/auth";
import config from "../../util/sessionHeader";
import MicRecorder from "mic-recorder-to-mp3";
import BackdropComponent from "../../components/BackdropComponent";
import NotificationSound from "../../assets/notification.mp3";
import {listenerMessages} from "../../services/socket-listener";
import {MyTooltip} from "../../components/MyTooltip";
import "emoji-mart/css/emoji-mart.css";

const SendMessagePage = () => {
    const dropRef = useRef(null);
    const [allMessages, setAllMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [dados, setDados] = useState([]);
    const [choosedContact, setChoosedContact] = useState([]);
    const [imgContact, setImgContact] = useState("");
    const [message, setMessage] = useState("");
    const chatRef = useRef(null);
    const messagesEnd = useRef(null);
    const [recordState, setRecordState] = useState(null);
    const [segundos, setSegundos] = useState(0);
    const [minutos, setMinutos] = useState(0);
    const [stop, setStop] = useState(true);
    const [isBlocked, setIsBlocked] = useState(false);
    const recorder = useMemo(() => new MicRecorder({bitRate: 128}), []);
    const [openLoading, setOpenLoading] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [emoji, setEmoji] = useState(false);
    const [hasMessages, setHasMessages] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        if (allMessages.length > 0 && !hasMessages) {
        setHasMessages(true);
        }
    }, [allMessages]);

    useEffect(() => {
        async function checkConnection() {
            try {
                await api.get(`${getSession()}/check-connection-session`, config());
                await getAllChats();
                await getAllContacts();
            } catch (e) {
                // history.push("/");
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

        if (!data.response.fromMe) {
            const audio = new Audio(NotificationSound);
            audio.play();
        }

        (async function () {
            const {data: {response}} = await api.get(`${getSession()}/all-chats-with-messages`, config());

            const arr = [];
            for (const elem of response) {
                if (!elem.archive) {
                    arr.push(elem);
                }
            }

            setChats(arr);
            setDados(arr);
        })()

        if (chatRef.current !== null) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }

        if (choosedContact.id !== undefined) {
            if (choosedContact.id === data.response.chatId || data.response.fromMe && choosedContact.id._serialized === data.response.to) {
                setAllMessages((prevState) => {
                    return [...prevState, data.response];
                });
                scrollToBottom();
            }
        }
    });

    async function getAllContacts() {
        const {data} = await api.get(`${getSession()}/all-contacts`, config());
        const arr = [];

        for (const contact of data.response) {
            if (contact.isMyContact && contact.id.user !== undefined)
                arr.push(contact);
        }

        setContacts(arr);
    }

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
                    phone: choosedContact.id,
                }, config());
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
            const {data: {response}} = await api.get(`${getSession()}/all-chats-with-messages`, config());

            const arr = [];
            for (const elem of response) {
                if (!elem.archive) {
                    arr.push(elem);
                }
            }

            setChats(arr);
            setDados(arr);
        } catch (e) {
            const {data: {response}} = await api.get(`${getSession()}/all-chats-with-messages`, config());

            const arr = [];
            for (const elem of response) {
                if (!elem.archive) {
                    arr.push(elem);
                }
            }

            setChats(arr);
            setDados(arr);
        }
    }

    const scrollToBottom = () => {
        if (messagesEnd.current !== null) {
            messagesEnd.current.scrollIntoView({behavior: "smooth"});
        }
    };

    const onClickContact = useCallback(async (contact) => {
        setImgContact("");
        setChoosedContact(contact);
        setOpenLoading(true);
        setAllMessages([]);
        setHasNoMore(false);

        try {
            if (contact.id.includes("@g.us")) {
                const {data} = await api.get(`${getSession()}/chat-by-id/${contact.id.replace(/[@g.us,@g.us]/g, "")}?isGroup=true`, config());
                await api.post(`${getSession()}/send-seen`,{phone: contact.id.replace("@g.us", "")}, config());
                setAllMessages(data?.response || []);
            } else {
                const {data} = await api.get(`${getSession()}/chat-by-id/${contact.id.replace(/[@c.us,@c.us]/g, "")}?isGroup=false`, config());
                await api.post(`${getSession()}/send-seen`,{phone: contact.id.replace("@c.us", "")}, config());
                setAllMessages(data?.response || []);
            }
        } catch (e) {
            console.log(e);
        }

        scrollToBottom();
        contact.unreadCount = 0;
        setOpenLoading(false);
    }, []);

    function clearAndScrollToBottom() {
        setMessage("");
        setEmoji(false);
        scrollToBottom();
    }

    function addEmoji(e) {
        let emoji = e.native;
        setMessage(message + emoji);
    }

    async function sendMessage() {
        if (!!message.trim() && !!getSession()) {
            //   const by = `*${getUser()}:* \n\n`;
            const by = "";
            let endpoint = "send-message";

            const body = {
                phone: choosedContact.id.replace(/[@c.us,@g.us]/g, ""),
                message: by + message,
            };

            if (choosedContact.id.includes("@g.us")) {
                body.isGroup = true;
            }

            if (selectedMessage) {
                body.messageId = selectedMessage.id;
                endpoint = "send-reply";
            }

            await api.post(`${getSession()}/${endpoint}`, body, config());
            clearAndScrollToBottom();
            setSelectedMessage(null);
        } else {
            toast.error("Digite uma mensagem!", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    function onChangeAnexo(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            const filename = e.target.files[0].name;
            reader.readAsDataURL(e.target.files[0]);

            reader.onload = async function (e) {
                const base64 = e.target.result;
                const options = {
                base64: base64,
                phone: choosedContact.id.replace(/[@c.us,@g.us]/g, ""),
                message: "",
                filename: filename,
            };
                if (choosedContact.id.includes("@g.us")) {
                    options.isGroup = true;
                }
                try {
                    await api.post(`${getSession()}/send-file-base64`, options, config());
                } catch (error) {
                    console.log("Catch onChangeAnexo()", error);
                }
            };
        }
    }

    function searchChat(e) {
        const { value } = e.target;

        const filterContact = contacts.filter((filtro) => {
        if (filtro.name && filtro.id._serialized) {
            return (
            filtro.name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .indexOf(value.toLowerCase()) > -1 ||
            filtro.id._serialized.indexOf(value) > -1
            );
        } else {
            return [];
        }
        });

        const filterChat = chats.filter((filtro) => {
        if (filtro.name && filtro.id) {
            return (
            filtro.name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .indexOf(value.toLowerCase()) > -1 || filtro.id.indexOf(value) > -1
            );
        } else {
            return [];
        }
        });

        const searchArr = [];

        for (const chat of filterChat) {
            searchArr.push({
                name: chat.name,
                id: chat.id,
                unreadCount: 0,
            });
        }

        for (const contact of filterContact) {
            searchArr.push({
                name: contact.name,
                id: contact.id._serialized,
                unreadCount: 0,
                msgs: null,
            });
        }

        const filterArr = removeDuplicates(searchArr);
        setChats(filterArr);

        if (value === "") {
            setChats(dados);
        }
    }

    const removeDuplicates = (arr) => {
        return arr.filter((item, index, self) => {
            if (item.name) return ( index === self.findIndex((t) => t.id === item.id && t.name && item.name));
        });
    };

    const [loadingMoreMessages, setLoadingMoreMessages] = useState(false);
    const [hasNoMore, setHasNoMore] = useState(false);

    async function loadMore() {
        setLoadingMoreMessages(true);
        try {
            let param = "?isGroup=false";
            if (choosedContact.id.includes("@g.us")) {
                param = "?isGroup=true";
            }
            const { data } = await api.get(
                `${getSession()}/load-earlier-messages/${choosedContact.id}${param}`,
                config()
            );
            if (data && data.response && Array.isArray(data.response)) {
                setAllMessages((prev) => [...data.response, ...prev]);
            }
            if (data && !data.response) {
                setHasNoMore(true);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoadingMoreMessages(false);
        }
    };

    return (
        <Layout>
            <Container ref={dropRef}>
                <ContentContainer>
                    <ConversasComponent
                        chats={chats}
                        setChats={setChats}
                        onClickContact={onClickContact}
                        onSearch={searchChat}
                    />

                    <BackdropComponent open={openLoading} />

                    <ChatContainer>
                        {choosedContact.length <= 0 ? null : (
                        <HeaderContact>
                            <div className={"container-info-ctt"}>
                            <img
                                src={
                                imgContact ||
                                `https://ui-avatars.com/api/?name=${choosedContact.name}?background=random`
                                }
                                alt={choosedContact.name}
                                loading={"lazy"}
                                onError={(e) =>
                                (e.target.src =
                                    "https://pbs.twimg.com/profile_images/1259926100261601280/OgmLtUZJ_400x400.png")
                                }
                            />
                            <h3>
                                {choosedContact.name === undefined
                                ? choosedContact.id
                                    .replace(/[@c.us,@g.us]/g, "")
                                : choosedContact.name}
                            </h3>
                            </div>
                        </HeaderContact>
                        )}

                        <ul ref={chatRef} style={{ overflowX: "hidden" }}>
                        {!hasNoMore && hasMessages && allMessages.length > 0 && (
                            <LoadMoreComponent onClick={loadMore}>
                                Carregar mais{loadingMoreMessages && <>&nbsp;&nbsp;&nbsp;<CircularProgress size={10}/></>}
                            </LoadMoreComponent>
                        )}

                        {!allMessages.length ? (
                            <WaitingContainer>
                            <div>
                                <img src={ImageLoader} alt={"Smartphone"} />
                                <h2>Choose a contact to start a conversation</h2>
                            </div>
                            </WaitingContainer>
                        ) : (
                            <div>
                            {allMessages.map((message) => {
                                return (
                                <li key={message.id} id={message.id}>
                                    <ChatComponent
                                    isMe={message.fromMe ? "right" : "left"}
                                    isWarning={
                                        !message?.body &&
                                        message.type !== "chat" &&
                                        !["ptt", "audio"].includes(message.type)
                                    }
                                    session={getSession()}
                                    token={getToken()}
                                    message={message}
                                    selectMessageId={() => setSelectedMessage(message)}
                                    />
                                </li>
                                );
                            })}
                            </div>
                        )}

                        <div ref={messagesEnd} />
                        </ul>

                        {!!selectedMessage && (
                        <ReplyContainer>
                            <div className="content">
                                <ChatComponent
                                    isMe={selectedMessage.fromMe ? "right" : "left"}
                                    isWarning={!selectedMessage?.body && selectedMessage.type !== "chat" && !["ptt", "audio"].includes(selectedMessage.type)}
                                    session={getSession()}
                                    token={getToken()}
                                    message={selectedMessage}
                                    selectMessageId={() => {}}
                                />
                            </div>
                            <div>
                                <MyTooltip
                                    name="Cancelar"
                                    icon={<CancelIcon />}
                                    onClick={() => setSelectedMessage(null)}
                                />
                            </div>
                        </ReplyContainer>
                        )}

                        {emoji ? <Picker onSelect={addEmoji} /> : null}
                        {choosedContact.length <= 0 ? null : (
                            <div className={"bottom-container"}>
                                <textarea
                                placeholder={"Digite uma mensagem..."}
                                onKeyDown={(event) => {
                                    if (event.ctrlKey && event.key === "Enter") {
                                    sendMessage();
                                    }
                                }}
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                }}
                                />

                                <div className={"action-buttons"}>
                                    <div>
                                        {emoji ? (
                                        <button onClick={() => setEmoji(false)}>
                                            <X />
                                        </button>
                                        ) : (
                                        <button onClick={() => setEmoji(true)}>
                                            <Smile />
                                        </button>
                                        )}

                                        <label>
                                        <input type={"file"} onChange={onChangeAnexo} />
                                        <div className={"attach-info"}>
                                            <Paperclip />
                                        </div>
                                        </label>

                                    </div>

                                    {message === "" ? (
                                        recordState === null ? (
                                        <Mic onClick={startRecording} />
                                        ) : (
                                        <Contador>
                                            <div className={"main-cont"}>
                                            <XCircle onClick={cancelRecording} />
                                            <div className={"counter"}>
                                                <p>
                                                {minutos === 0
                                                    ? `${segundos}s`
                                                    : `${minutos}m ${segundos}s`}
                                                </p>
                                            </div>
                                            <CheckCircle onClick={() => finishRecording()} />
                                            </div>
                                        </Contador>
                                        )
                                    ) : (
                                        <Send onClick={(e) => sendMessage(e)} />
                                    )}
                                </div>
                            </div>
                        )}
                    </ChatContainer>
                </ContentContainer>
            </Container>
        </Layout>
    );
};

export default SendMessagePage;