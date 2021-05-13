import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {CircularProgress} from "@material-ui/core";
import {FilePlus, X} from "lucide-react";
import {CancelButton, Footer, Header, InputCustom, ListMenu, SendButton} from "./style";
import PropTypes from "prop-types";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: "#fff",
        boxShadow: theme.shadows[5],
        borderRadius: 30,
        width: 500,
        "@media (max-width:768px)": {
            margin: "0 10px"
        },
    },
}));

const useStylesBackdrop = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
}));

function ModalCreateGroup({open, handleClose}) {
    const [sessionName, setSessionName] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const classesBackdrop = useStylesBackdrop();
    const classes = useStyles();

    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };

    const handleToggleBackdrop = () => {
        setOpenBackdrop(true);
    };

    const handleClickAlert = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenAlert(false);
    };

    async function onSubmitForm() {
        if (sessionName !== "") {
            try {
                handleToggleBackdrop();
                // await api.post("api/session/create-session", {id_user: getIdUser(), session_name: sessionName});
                setTimeout(() => {
                    handleCloseBackdrop();
                    onClose();
                }, 3000);
            } catch (e) {
                handleClickAlert();
                handleCloseBackdrop();
            }
        }
    }

    function onClose() {
        handleClose();
        setSessionName("");
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={onClose}
            >
                <div className={classes.paper}>
                    <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity="error">
                            O nome da sessão já existe, escolha outro.
                        </Alert>
                    </Snackbar>

                    <Backdrop className={classesBackdrop.backdrop} open={openBackdrop}>
                        <CircularProgress color="inherit"/>
                    </Backdrop>

                    <Header>
                        <div>
                            <h2>
                                Criar Grupo
                            </h2>

                            <X onClick={onClose}/>
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <p className={"description"}>
                                Digite o nome da sessão que você deseja criar.
                            </p>
                        </div>
                    </Header>

                    <ListMenu>
                        <div className={"container"}>
                            <InputCustom>
                                <input
                                    value={sessionName}
                                    onChange={(e) => setSessionName(e.target.value)}
                                />

                                <span>
                                      <FilePlus/> Nome da Sessão
                                   </span>
                            </InputCustom>
                        </div>
                    </ListMenu>

                    <Footer>
                        <CancelButton onClick={onClose}>
                            Descartar
                        </CancelButton>
                        <SendButton onClick={onSubmitForm}>
                            Criar
                        </SendButton>
                    </Footer>
                </div>
            </Modal>
        </div>
    );
}

ModalCreateGroup.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};


export default ModalCreateGroup;