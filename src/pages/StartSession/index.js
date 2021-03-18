import React, {useRef, useEffect, useState} from 'react';
import {Layout, Container, Formulario, ImageCustom, Title, Description} from "./style";
import Image from '../../assets/hand-smartphone.png'
import BackdropComponent from "../../components/BackdropComponent";
import api, {socket} from "../../services/api";
import history from "../../history";

const StartSessionPage = () => {
    const [session, setSession] = useState("")
    const [qrCode, setQrCode] = useState(Image)
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const animationRef = useRef(null);
    const layoutRef = useRef(null);

    useEffect(() => {
        socket.on('whatsapp-started', (status) => {
            console.log(status)
        })

        socket.on('qrCode', (qrCode) => {
            if (session === qrCode.session) {
                setQrCode(qrCode.data)
                handleCloseBackdrop();
                if (animationRef.current !== null) {
                    animationRef.current.classList.remove("animation")
                }

                document.querySelector("#title").textContent = "Escaneie o QRCode"
                document.querySelector("#description").textContent = "Para prosseguir você deve abrir o seu app do Whatsapp escanear o QRCode através da câmera."
            }
        })

        socket.on('whatsapp-status', (status) => {
            if (status) {
                if (layoutRef.current !== null) {
                    layoutRef.current.classList.add("saida-bottom-top")
                }
                setTimeout(() => {
                    history.push("send-message")
                }, 500)
            } else {
                alert('Whatsapp fechado com sucesso')
            }
        })
    }, [session])

    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };

    const handleToggleBackdrop = () => {
        setOpenBackdrop(!openBackdrop);
    };

    async function submitSession(e) {
        e.preventDefault()

        if (session === "") {
            alert("Digite o nome da sessão antes de continuar...")
        } else {
            handleToggleBackdrop();
            await startSession(session)
        }
    }

    async function startSession(session) {
        let params = new FormData()
        params.append('sessionName', session)
        await api.post('iniciar-sessao', params)
    }

    return (
        <Layout ref={layoutRef}>
            <BackdropComponent open={openBackdrop}/>

            <Container>
                <ImageCustom ref={animationRef} className={"animation"} src={qrCode} alt={"Smartphone"}
                             draggable={"false"}/>

                <div className={"container-session"}>
                    <Title id={"title"}>
                        Para começar é simples
                    </Title>

                    <Description id={"description"}>
                        Digite o nome da sessão no campo abaixo, clique em <b>enviar</b> e aguarde alguns segundos até o
                        QRCode aparecer na tela 😊
                    </Description>

                    <Formulario onSubmit={(e) => submitSession(e)}>
                        <input autoComplete="off" placeholder="Nome da sessão" value={session}
                               onChange={(e) => setSession(e.target.value)}/>

                        <button type="submit" id="send-btn">
                            Enviar
                        </button>
                    </Formulario>
                </div>
            </Container>
        </Layout>
    );
};

export default StartSessionPage;