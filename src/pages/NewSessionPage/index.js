import React, {useEffect, useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {Container, Description, Formulario, ImageCustom, Layout, Title} from "./style";
import {HelpCircle, X} from "react-feather";
import api, {socket} from "../../services/api";
import history from "../../history";
import ModalMenu from "../../components/MenuModal";
import ErrorModal from "../../components/ErrorModal";
import BackdropComponent from "../../components/BackdropComponent";
import {useLocation} from "react-router-dom";
import {defaultKey, login} from "../../services/auth";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: 0,
        outline: 0,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: "100%",
        height: "100%"
    },
}));

export default function NewSessionPage() {
    const classes = useStyles();
    const [open,] = useState(true);
    const [session, setSession] = useState("");
    const [token, setToken] = useState("");
    const [qrCode, setQrCode] = useState("");
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [openMenuModal, setOpenMenuModal] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [titleError, setTitleError] = useState("");
    const animationRef = useRef(null);
    const layoutRef = useRef(null);

    const {state: haveLogin} = useLocation();

    useEffect(() => {
        socket.on("qrCode", (qrCode) => {
            if (session === qrCode.session) {
                setQrCode(qrCode.data);
                handleCloseBackdrop();
                if (animationRef.current !== null) {
                    animationRef.current.classList.remove("animation");
                }

                document.querySelector("#title").textContent = "Escaneie o QRCode";
                document.querySelector("#description").textContent = "Para prosseguir você deve abrir o seu app do Whatsapp escanear o QRCode através da câmera.";
            }
        });

        socket.off("session-logged").on("session-logged", (status) => {
            if (status) {
                if (layoutRef.current !== null) {
                    layoutRef.current.classList.add("saida-bottom-top");
                }

                setTimeout(() => {
                    window.location.href = "chat";
                }, 500);
            } else {
                alert("Whatsapp fechado com sucesso");
            }
        });
    }, [session]);

    async function submitSession(e) {
        e.preventDefault();

        if (session === "") {
            handleOpenErrorModal();
            setTitleError("Preencha todos os campos");
            setErrorMessage("Você precisa preencher todos os campos antes de continuar.");
        } else {
            handleToggleBackdrop();
            await startSession();
        }
    }

    async function startSession() {
        try {
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };

            const checkConn = await api.get(`${session}/check-connection-session`, config);
            if (!checkConn.data.status) {
                await signSession();
                login(JSON.stringify({session: session, token: token}));
            } else {
                if (defaultKey() !== null) {
                    await api.close(`${session}/close-session`);
                    await signSession();
                    login(JSON.stringify({session: session, token: token}));
                }
            }
        } catch (e) {
            setTimeout(function () {
                handleCloseBackdrop();
                handleOpenErrorModal();
                setTitleError("Oops... Algo deu errado.");
                setErrorMessage("Verifique se a sessão e o token estão corretos.");
            }, 2000);
        }
    }

    async function signSession() {
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };
        await api.post(`${session}/start-session`, null, config);
    }

    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };

    const handleToggleBackdrop = () => {
        setOpenBackdrop(!openBackdrop);
    };

    const handleCloseModal = () => {
        setOpenMenuModal(false);
    };

    const handleOpenModal = () => {
        setOpenMenuModal(true);
    };

    const handleCloseErrorModal = () => {
        setOpenErrorModal(false);
    };

    const handleOpenErrorModal = () => {
        setOpenErrorModal(true);
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Layout className={classes.paper}>
                        <ModalMenu handleClose={handleCloseModal} open={openMenuModal}/>
                        <ErrorModal handleClose={handleCloseErrorModal} open={openErrorModal}
                                    errorMessage={errorMessage}
                                    titleError={titleError}/>
                        <BackdropComponent open={openBackdrop}/>

                        {
                            haveLogin !== undefined ?
                                <div className={"close-item"} onClick={() => history.goBack()}>
                                    <X/>
                                </div>
                                : null
                        }

                        <Container>
                            <div className={"container-session"}>
                                <Title id={"title"}>
                                    Entre com sua sessão
                                </Title>

                                <Description id={"description"}>
                                    <p>
                                        Digite o nome da sessão no campo abaixo, clique em <b>enviar</b> e
                                        aguarde alguns
                                        segundos até o
                                        QRCode aparecer na tela 😊
                                    </p>
                                </Description>

                                {
                                    qrCode === "" ? null : (
                                        <ImageCustom
                                            ref={animationRef}
                                            className={"animation noselect"}
                                            autoplay
                                            src={qrCode}
                                            alt={"Smartphone"}
                                            draggable={"false"}
                                        />
                                    )
                                }

                                <Formulario onSubmit={(e) => submitSession(e)}>
                                    <p>
                                        Sessão
                                    </p>
                                    <input autoComplete="off" placeholder="Nome da sessão" value={session}
                                           onChange={(e) => setSession(e.target.value)}/>

                                    <div className={"inline"}>
                                        <p>
                                            Token
                                        </p>

                                        <div>
                                            <input autoComplete="off" placeholder="Token" value={token}
                                                   onChange={(e) => setToken(e.target.value)}/>

                                            <HelpCircle onClick={() => handleOpenModal()}/>
                                        </div>
                                    </div>

                                    <button type="submit" id="send-btn">
                                        Enviar
                                    </button>
                                </Formulario>
                            </div>

                        </Container>
                    </Layout>
                </Fade>
            </Modal>
        </div>
    );
}