import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {ImageComponent, Layout, TopButtons} from "./style";
import {Download, X} from "react-feather";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: "#000",
        border: 0,
        outline: 0,
        boxShadow: theme.shadows[1],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ImageModal({open, handleClose, message, image}) {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [profileImage, setProfileImage] = useState("");

    useEffect(() => {
        if (open) {
            setProfileImage(message.sender.profilePicThumbObj.eurl);
            if (message.fromMe) {
                setName(message.sender.formattedName);
            } else {
                setName(message.sender.pushname);
            }
        }
    }, [open]);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
            >
                <div className={classes.paper}>
                    <Layout>
                        <TopButtons>
                            <div className={"info-user"}>
                                <img
                                    src={profileImage}
                                    loading={"lazy"}
                                    onError={(e) => e.target.src = "https://pbs.twimg.com/profile_images/1259926100261601280/OgmLtUZJ_400x400.png"}
                                    alt={name}
                                />

                                <p>
                                    {name}
                                </p>
                            </div>

                            <div>
                                <a
                                    href={image}
                                    download={"WPPConnect-Image"}
                                    target={"_blank"}
                                    rel={"noreferrer"}
                                >
                                    <Download/>
                                </a>

                                <X onClick={handleClose}/>
                            </div>
                        </TopButtons>

                        <ImageComponent>
                            <img src={image} alt={message}/>
                        </ImageComponent>
                    </Layout>
                </div>
            </Modal>
        </div>
    );
}

ImageModal.propTypes = {
    message: PropTypes.any.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
};