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
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {CircularProgress, TextareaAutosize, TextField} from "@material-ui/core";
import {Button, CancelButton, Container, Footer, Header, Input, ListMenu} from "./style";
import PropTypes from "prop-types";
import {getSession} from "../../../services/auth";
import api from "../../../services/api";
import config from "../../../util/sessionHeader";
import {Autocomplete} from "@material-ui/lab";
import Swal from "sweetalert2";

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
        borderRadius: 10
        ,
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
    const [openAlert, setOpenAlert] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");
    const [tagsChoosed, setTagsChoosed] = useState([]);
    const [avatar, setAvatar] = useState("https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png");
    const [file, setFile] = useState("");
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
        const {data} = await api.get(`${getSession()}/all-contacts`, config());
        const arr = [];
        for (const contact of data.response) {
            if (contact.isMyContact && contact.id.user !== undefined)
                arr.push(contact);
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
        if (groupName !== "" || tagsChoosed.length > 0 || description !== "") {
            try {
                handleToggleBackdrop();

                const {data} = await api.post(`${getSession()}/create-group`, {
                    participants: tagsChoosed,
                    name: groupName
                }, config());

                for (const groupInfoElement of data.groupInfo) {
                    setTimeout(async () => {
                        await api.post(`${getSession()}/group-description`, {
                            groupId: groupInfoElement.id,
                            description: description
                        }, config());

                        const formData = new FormData();
                        formData.append("file", file);
                        formData.append("phone", groupInfoElement.id);
                        await api.post(`${getSession()}/group-pic`, formData, config());
                    }, 500);
                }

                setTimeout(() => {
                    onClose();
                    handleCloseBackdrop();
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso',
                        text: 'O seu grupo foi criado com sucesso!',
                    });
                }, 3000);
            } catch (e) {
                handleCloseBackdrop();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Houve um erro ao criar o grupo, tente novamente mais tarde...',
                });
            }
        }
    }

    function onClose() {
        handleClose();
        setGroupName("");
        setDescription("");
        setAvatar("https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png")
        setFile("");
        setTagsChoosed([]);
    }

    const onTagsChange = (event, values) => {
        const arr = [];
        for (const contact of values) {
            if (contact.id) {
                arr.push(contact.id.user);
            } else {
                arr.push(contact);
            }
        }

        setTagsChoosed(arr);
    };

    function handleImageChange(e) {
        const {files} = e.target;

        if (files && files[0]) {
            setFile(files[0]);

            const reader = new FileReader();
            reader.onload = function (e) {
                setAvatar(e.target.result);
            }

            reader.readAsDataURL(files[0])
        }
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
                <Container className={classes.paper}>
                    <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity="error">

                        </Alert>
                    </Snackbar>

                    <Backdrop className={classesBackdrop.backdrop} open={openBackdrop}>
                        <CircularProgress color="inherit"/>
                    </Backdrop>

                    <Header>
                        {/*<img id={"ic_plus"} src={PlusCircleIcon} alt={"Plus"} draggable={false}/>*/}

                        <div>
                            <h2>
                                Create Group
                            </h2>
                        </div>
                    </Header>

                    <ListMenu>
                        <div className={"container"}>
                            <div id={"profile-image"}>
                                <img
                                    src={avatar}
                                    alt={groupName}
                                    draggable={false}
                                />

                                <label>
                                    <input
                                        type={"file"}
                                        accept={"image/*"}
                                        onChange={handleImageChange}
                                    />

                                    <span>
                                        Change Image
                                    </span>
                                </label>
                            </div>

                            <p>
                                Group Name
                            </p>
                            <Input
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                placeholder={"Group Name"}
                            />

                            <p>
                                Choose Participants
                            </p>
                            <Autocomplete
                                freeSolo
                                multiple
                                id="size-small-outlined-multi"
                                size="small"
                                options={contacts}
                                getOptionLabel={(option) => option.name || option}
                                onChange={onTagsChange}
                                style={{marginBottom: "1em"}}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        placeholder="Choose a contact"
                                    />
                                )}
                            />

                            <p>
                                Description
                            </p>
                            <TextareaAutosize
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={"Description Group"}
                                rowsMin={4}
                            />

                        </div>
                    </ListMenu>

                    <Footer>
                        <CancelButton onClick={onClose}>
                            Cancel
                        </CancelButton>
                        <Button onClick={onSubmitForm}>
                            Create Group
                        </Button>
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
