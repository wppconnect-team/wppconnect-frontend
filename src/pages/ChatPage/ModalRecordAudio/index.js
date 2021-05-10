import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import {AudioComponent, Layout} from "./style";
import {Check, X} from "react-feather";
import api from "../../../services/api";
import {getSession} from "../../../services/auth";
import config from "../../../util/sessionHeader";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(10px)"
    },
    paper: {
        border: 0,
        outline: 0,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },
}));

function ModalAudioRecord({open, handleClose, contact}) {
    const classes = useStyles();
    let mediaRecorder;

    useEffect(() => {
        if (open) {
            navigator.mediaDevices.getUserMedia({audio: true})
                .then((stream) => {
                    mediaRecorder = new MediaRecorder(stream, {type: "audio/ogg"});
                    mediaRecorder.start();

                    const audioChunks = [];

                    mediaRecorder.addEventListener("dataavailable", async (event) => {
                        audioChunks.push(event.data);
                        // const blob = new Blob(audioChunks, {type: "audio/ogg"});
                        const reader = new FileReader();
                        // reader.readAsText(blob);

                        reader.onloadend = async () => {
                            await api.post(`${getSession()}/send-voice`, {
                                phone: contact.id.user,
                                url: reader.result
                            }, config);
                        };

                        reader.readAsDataURL(event.data);
                    });

                    mediaRecorder.addEventListener("stop", () => {
                        stream.getTracks().forEach(function (track) {
                            track.stop();
                            handleClose();
                        });
                    });
                });
        }
    }, [open]);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Layout className={classes.paper}>

                        <AudioComponent>
                            <lottie-player
                                src="https://assets7.lottiefiles.com/private_files/lf30_ba3dg7qr.json"
                                background="transparent"
                                speed="1"
                                style={{width: "100%", height: "100%"}}
                                loop
                                autoplay
                            />
                        </AudioComponent>
                        <h2>
                            Gravando...
                        </h2>

                        <div className={"buttons"}>
                            <div className={"cancel"}>
                                <X onClick={() => {
                                    mediaRecorder.stop();
                                    handleClose();
                                }}/>
                            </div>

                            <div className={"finish"} onClick={() => {
                                mediaRecorder.stop();
                            }}>
                                <Check/>
                            </div>
                        </div>
                    </Layout>
                </Fade>
            </Modal>
        </div>
    );
}

ModalAudioRecord.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    contact: PropTypes.any
};

export default ModalAudioRecord;