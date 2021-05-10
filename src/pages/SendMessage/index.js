import React, {useEffect, useRef, useState} from "react";
import {ChatContainer, Container, Formulario, Layout, TopContainer, WaitingContainer} from "./style";
import {PlusCircle, Send} from "react-feather";
import api, {socket} from "../../services/api";
import history from "../../history";
import HandWatch from "../../assets/hand-watch.png";

const SendMessagePage = () => {
    const [sessions, setSessions] = useState([]);
    const [messages, setMessages] = useState([]);
    const [choosedSession, setChoosedSession] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const chatRef = useRef(null);

    useEffect(() => {
        async function getSessions() {
            const response = await api.get("mostrar-sessoes");
            setSessions(response.data);
        }

        settingMessage();
        getSessions();
    }, []);

    async function settingMessage() {
        socket.off("mensagem-recebida").on("mensagem-recebida", async (message) => {
            if (chatRef.current !== null) {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            }

            console.log(message);
            let estruturaMessage = {
                body: message.message.body,
                username: message.message.chat.name,
                phone: message.message.chat.id,
                session: message.message.session,
                fromMe: message.message.fromMe,
                myPhone: message.message.from
            };

            setMessages((prevState => {
                return [...prevState, estruturaMessage];
            }));
        });
    }

    async function sendMessage(e) {
        e.preventDefault();
        if (phone !== "" || message !== "" || choosedSession !== "") {
            const params = new FormData();
            params.append("phone", phone);
            params.append("msg", message);
            params.append("session", choosedSession);
            await api.post("enviar-mensagem", params);

            setMessage("");
        } else {
            alert("Preencha todos os dados antes de enviar");
        }
    }

    return (
        <Layout>
            <Container>
                <TopContainer>
                    <h1>
                        Enviar mensagem
                    </h1>

                    <span onClick={() => history.push("/")}>
                        <PlusCircle/> <p>Nova Sessão</p>
                    </span>
                </TopContainer>

                <ChatContainer>
                    <ul ref={chatRef}>
                        {
                            messages.length <= 0 ? (
                                <WaitingContainer>
                                    <img src={HandWatch} alt={"Waiting Message"} draggable={"false"}/>
                                    <h2>
                                        Envie ou receba uma mensagem
                                    </h2>
                                    <p>
                                        Aqui será mostrado todas as mensagens que você enviar/receber. A sessão que
                                        recebeu a mensagem estará acima do nome do contato.
                                    </p>
                                </WaitingContainer>
                            ) : (
                                messages.map((message, index) => {
                                    return (
                                        message.fromMe ? (
                                            <li key={index}>
                                                <div className={"right"}>
                                                    <small>
                                                        Sessão: {message.session}
                                                    </small>
                                                    <p>
                                                        Eu <small>({message.myPhone})</small>
                                                    </p>
                                                    <span>
                                                        {message.body}
                                                    </span>
                                                </div>
                                            </li>
                                        ) : (
                                            <li key={index}>
                                                <div className={"left"}>
                                                    <small>
                                                        Sessão: {message.session}
                                                    </small>
                                                    <p>
                                                        {message.username} <small>({message.phone})</small>
                                                    </p>
                                                    <span>
                                                        {message.body}
                                                    </span>
                                                </div>
                                            </li>
                                        )
                                    );
                                })
                            )
                        }
                    </ul>
                </ChatContainer>

                <Formulario onSubmit={(e) => sendMessage(e)}>
                    <div>
                        <select defaultValue={""} onChange={(e) => setChoosedSession(e.target.value)}>
                            <option value={""}>
                                Escolha uma sessão
                            </option>
                            {
                                sessions.map((session, index) => {
                                    return (
                                        <option key={index} value={session}>
                                            {session}
                                        </option>
                                    );
                                })
                            }
                        </select>

                        <input placeholder={"Digite um número sem usar @c.us"} value={phone}
                               onChange={(e) => setPhone(e.target.value)}/>
                    </div>

                    <div>
                        <input placeholder={"Mensagem"} value={message} onChange={(e) => setMessage(e.target.value)}/>
                        <button type={"submit"}>
                            <Send/>
                        </button>
                    </div>
                </Formulario>
            </Container>
        </Layout>
    );
};

export default SendMessagePage;