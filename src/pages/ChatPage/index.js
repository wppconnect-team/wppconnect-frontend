import React, {useEffect, useRef, useState} from 'react';
import {
    ChatContainer,
    Container,
    ContentContainer, HeaderContact,
    Layout,
    SessionsContainer,
    WaitingContainer
} from "./style";
import {Plus, Send} from "react-feather";
import api, {socket} from "../../services/api";
import ImageLoader from '../../assets/hand-smartphone.png'
import history from "../../history";
import ChatComponent from "../../components/ChatPage/ChatComponent";
import ContactsComponent from "../../components/ChatPage/ContactsComponent";

const SendMessagePage = () => {
    const [sessions, setSessions] = useState([])
    const [messages, setMessages] = useState([])
    const [contacts, setContacts] = useState([])
    const [choosedContact, setChoosedContact] = useState([])
    const [choosedSession, setChoosedSession] = useState([])
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const chatRef = useRef(null)
    const messagesEnd = useRef(null)

    useEffect(() => {
        async function getSessions() {
            try {
                const sessionItem = getLocalStorage();
                const defaultSession = sessionItem[0];

                const config = {
                    headers: {Authorization: `Bearer ${defaultSession.token}`}
                };

                const response = await api.get(`${defaultSession.session}/show-all-sessions`, config);
                setSessions(response.data)
            } catch (e) {
                localStorage.removeItem('@WPPConnectToken');
                history.push('/nova-sessao');
            }
        }

        settingMessage()
        getSessions()
    }, [])

    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({behavior: "smooth"});
    }

    function getLocalStorage() {
        return JSON.parse(localStorage.getItem('@WPPConnectToken'));
    }

    async function settingMessage() {
        socket.off('received-message').on('received-message', async (message) => {
            if (chatRef.current !== null) {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            }

            let estruturaMessage = {
                body: message.response.body,
                session: message.response.session,
                fromMe: message.response.fromMe,
                from: message.response.from,
                chat: {
                    name: message.response.chat.name,
                },
                chatId: {
                    user: message.response.chatId.user || message.response.chatId
                }
            }

            setMessages((prevState => {
                return [...prevState, estruturaMessage]
            }))

            scrollToBottom()
        })
    }

    async function onClickSession(session) {
        setChoosedSession([{session: session.session, token: session.token}]);

        const config = {
            headers: {Authorization: `Bearer ${session.token}`}
        };
        const response = await api.get(`${session.session}/show-all-contacts`, config);
        setContacts(response.data.response)
    }

    async function onClickContact(contact) {
        setChoosedContact(contact);

        const config = {
            headers: {Authorization: `Bearer ${choosedSession[0].token}`}
        };

        const response = await api.post(`${choosedSession[0].session}/get-chat-by-id`, {phone: contact.id._serialized}, config);
        setMessages(response.data.response);

        scrollToBottom()
    }

    async function sendMessage(e) {
        e.preventDefault()
        if (phone !== "" || message !== "" || choosedSession[0].session !== "") {
            const infoSession = choosedSession[0];
            setMessage("");
            scrollToBottom();

            const config = {
                headers: {Authorization: `Bearer ${infoSession.token}`}
            };

            //header
            await api.post(`${infoSession.session}/send-message`, {
                    phone: choosedContact.id.user,
                    message: message
                },
                config
            );
        } else {
            alert("Preencha todos os dados antes de enviar")
        }
    }

    return (
        <Layout>

            <Container>
                <ContentContainer>
                    <SessionsContainer>
                        <h2>
                            Sessão
                        </h2>
                        <ul>
                            {
                                sessions.map((session, index) => {
                                    return (
                                        <li key={index}
                                            onClick={() => onClickSession(session)}>
                                            <label>
                                                <input type={"radio"}/>

                                                <div className={"info-session"}>
                                                    <small>
                                                        Sessão:
                                                    </small>
                                                    <p>
                                                        {session.session}
                                                    </p>
                                                </div>
                                            </label>
                                        </li>
                                    )
                                })
                            }

                        </ul>

                        <div className={"plus-button"} onClick={() => history.push("nova-sessao")}>
                            <Plus/>
                        </div>
                    </SessionsContainer>

                    <ChatContainer>
                        {
                            choosedContact.length <= 0 ?
                                null
                                : (
                                    <HeaderContact>
                                        <div className={"container-info-ctt"}>
                                            <img
                                                src={choosedContact.profilePicThumbObj.eurl === undefined ? 'https://pbs.twimg.com/profile_images/1259926100261601280/OgmLtUZJ_400x400.png' : choosedContact.profilePicThumbObj.eurl}
                                                alt={`Photo of ${choosedContact.name}`}
                                                loading={"lazy"}
                                                onError={(e) => e.target.src = 'https://pbs.twimg.com/profile_images/1259926100261601280/OgmLtUZJ_400x400.png'}
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
                                                conversa com <b>qualquer pessoa</b> clicando <a href={"#"}>aqui</a>
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
                                                            session={choosedSession[0].session}
                                                            token={choosedSession[0].token}
                                                            message={message}
                                                        />
                                                    </li>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }

                            <div ref={messagesEnd}/>
                        </ul>

                        <form className={"bottom-container"} onSubmit={(e) => sendMessage(e)}>
                            <input placeholder={"Digite uma mensagem..."} value={message}
                                   onChange={(e) => setMessage(e.target.value)}/>
                            <Send type={"submit"}/>
                        </form>
                    </ChatContainer>

                    <ContactsComponent contacts={contacts} onClickContact={onClickContact}/>
                </ContentContainer>
            </Container>
        </Layout>
    );
};

export default SendMessagePage;