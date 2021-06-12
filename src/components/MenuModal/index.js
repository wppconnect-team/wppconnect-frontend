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
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {ModalContainer} from "./style";
import {Link} from "react-feather";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: "#E9E9E9",
        border: 0,
        outline: 0,
        width: 400,
        "@media (max-width:768px)": {
            maxWidth: "90%",
        },
        boxShadow: theme.shadows[5],
        padding: 0,
        borderRadius: 12
    },
}));

function ModalMenu({open, handleClose}) {
    const classes = useStyles();

    const onClose = () => {
        handleClose();
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <ModalContainer>
                            <div className={"middle-section"}>
                                <h2>
                                    Token
                                </h2>
                                <p>
                                    Não sabe o token? Dá uma olhada lá na documentação do servidor 😃
                                </p>
                            </div>

                            <div className={"bottom-section"}>
                                <button onClick={handleClose}>
                                    Fechar
                                </button>

                                <a href={"https://github.com/wppconnect-team/wppconnect-server"} rel={"noreferrer"}
                                   target={"_blank"}>
                                    <Link/> Abrir Documentação
                                </a>
                            </div>
                        </ModalContainer>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

ModalMenu.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default ModalMenu;