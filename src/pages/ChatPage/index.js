import React, {useEffect, useRef, useState} from "react";
import {ChatContainer, Container, ContentContainer, HeaderContact, Layout, WaitingContainer} from "./style";
import {Send} from "react-feather";
import api, {socket} from "../../services/api";
import ImageLoader from "../../assets/hand-smartphone.png";
import ChatComponent from "../../components/ChatPage/ChatComponent";
import ConversasComponent from "../../components/ChatPage/ConversasComponent";
import {defaultKey, getSession, getToken, logout} from "../../services/auth";
import config from "../../util/sessionHeader";
import history from "../../history";

const SendMessagePage = () => {
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [choosedContact, setChoosedContact] = useState([]);
    const [message, setMessage] = useState("");
    const chatRef = useRef(null);
    const messagesEnd = useRef(null);

    useEffect(() => {
        async function checkConnection() {
            try {
                await api.get(`${getSession()}/check-connection-session`, config);
                if (defaultKey() === null) {
                    history.push("/");
                } else {
                    await getAllChats();
                    await settingMessage();
                }
            } catch (e) {
                logout();
                history.push("/");
            }
        }

        checkConnection();

        return () => {
            setChats([]);
            setMessages([]);
        };
    }, [choosedContact]);

    async function settingMessage() {
        socket.off("received-message").on("received-message", async (message) => {
            if (chatRef.current !== null) {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            }

            if (choosedContact.id !== undefined) {
                if (choosedContact.id._serialized === message.response.chatId || message.response.fromMe && choosedContact.id._serialized === message.response.to) {
                    setMessages((prevState => {
                        return [...prevState, message.response];
                    }));

                    scrollToBottom();
                }
            }

        });
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
        messagesEnd.current.scrollIntoView({behavior: "smooth"});
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

    async function sendMessage(e) {
        e.preventDefault();
        if (message !== "" || getSession() !== "") {
            setMessage("");
            scrollToBottom();

            await api.post(`${getSession()}/send-message`, {
                phone: choosedContact.id.user,
                message: message
            }, config);
        } else {
            alert("Preencha todos os dados antes de enviar");
        }
    }

    return (
        <Layout>
            <Container>
                <ContentContainer>
                    <ConversasComponent contacts={chats} onClickContact={onClickContact}/>

                    <ChatContainer>
                        {
                            choosedContact.length <= 0 ?
                                null
                                : (
                                    <HeaderContact>
                                        <div className={"container-info-ctt"}>
                                            <img
                                                src={choosedContact.contact.profilePicThumbObj === undefined ? "https://pbs.twimg.com/profile_images/1259926100261601280/OgmLtUZJ_400x400.png" : choosedContact.contact.profilePicThumbObj.eurl}
                                                alt={`${choosedContact.name}`}
                                                loading={"lazy"}
                                                onError={(e) => e.target.src = "https://pbs.twimg.com/profile_images/1259926100261601280/OgmLtUZJ_400x400.png"}
                                            />
                                            <h3>
                                                {choosedContact.name}
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
                            <input
                                placeholder={"Digite uma mensagem..."}
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                }}
                            />
                            <Send type={"submit"}/>
                        </form>
                    </ChatContainer>
                </ContentContainer>
            </Container>
        </Layout>
    );
};

export default SendMessagePage;
