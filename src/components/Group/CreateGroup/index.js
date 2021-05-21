import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {CircularProgress, TextField} from "@material-ui/core";
import {FilePlus, X} from "lucide-react";
import {CancelButton, Container, Footer, Header, InputCustom, ListMenu, SendButton} from "./style";
import PropTypes from "prop-types";
import {getSession} from "../../../services/auth";
import api from "../../../services/api";
import config from "../../../util/sessionHeader";
import {Autocomplete} from "@material-ui/lab";
import {Edit} from "react-feather";

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
        width: 500,
        outline: 0,
        border: 0,
        maxHeight: "90%",
        padding: "1em 0",
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
    const [groupName, setGroupName] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [tagsChoosed, setTagsChoosed] = useState("");
    const classesBackdrop = useStylesBackdrop();
    const classes = useStyles();

    useEffect(() => {
        if (open) {
            getContacts();
        }

        return () => {
            setContacts([]);
        };
    }, [open]);

    async function getContacts() {
        const {data} = await api.get(`${getSession()}/all-contacts`, config);
        const arr = [];
        for (const contact of data.response) {
            if (contact.isMyContact && contact.id.user !== undefined)
                arr.push(contact.id.user);
        }

        setContacts(arr);
    }

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
        if (groupName !== "") {
            try {
                handleToggleBackdrop();

                const data = {
                    participants: tagsChoosed,
                    name: groupName
                };
                await api.post(`${getSession()}/create-group`, data, config);

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
        setGroupName("");
    }

    const onTagsChange = (event, values) => {
        setTagsChoosed(values);
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={onClose}
            >
                <Container className={classes.paper}>
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
                                Crie um grupo diretamente por aqui
                            </p>
                        </div>
                    </Header>

                    <ListMenu>
                        <div className={"container"}>
                            <div id={"profile-image"}>
                                <img
                                    src={"https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
                                    alt={groupName}
                                    draggable={false}
                                />

                                <label>
                                    <input
                                        type={"file"}
                                        accept={"image/*"}
                                    />

                                    <div className={"edit-icon"}>
                                        <Edit/>
                                    </div>
                                </label>
                            </div>

                            <InputCustom>
                                <input
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                />

                                <span>
                                      <FilePlus/> Nome do Grupo
                                   </span>
                            </InputCustom>

                            <Autocomplete
                                freeSolo
                                multiple
                                id="size-small-outlined-multi"
                                size="small"
                                options={contacts}
                                getOptionLabel={(option) => option}
                                onChange={onTagsChange}
                                style={{marginBottom: "1em"}}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        placeholder="Adicione um contato"
                                    />
                                )}
                            />
                        </div>


                    </ListMenu>

                    <Footer>
                        <CancelButton onClick={onClose}>
                            Em breve
                        </CancelButton>
                        {/*<SendButton onClick={onSubmitForm}>*/}
                        {/*    Criar*/}
                        {/*</SendButton>*/}
                    </Footer>
                </Container>
            </Modal>
        </div>
    );
}

ModalCreateGroup.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};


export default ModalCreateGroup;