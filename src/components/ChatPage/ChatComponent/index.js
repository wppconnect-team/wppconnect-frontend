import React, {useEffect, useRef, useState} from "react";
import {
    ChatLayout,
    ImageContainer,
    MessageContainer,
    MessageContent,
    MessageContentText,
    StickerComponent
} from "./style";
import AudioComponent from "../AudioComponent";
import api from "../../../services/api";
import ImageModal from "./ImageModal";
import PropTypes from "prop-types";
import config from "../../../util/sessionHeader";
import formatWppMarkdown from "../../../util/functionsMarkdown";

const defaultImage = "https://pbs.twimg.com/profile_images/1259926100261601280/OgmLtUZJ_400x400.png";

const ChatComponent = ({message, session, isMe}) => {
    const imageRef = useRef(null);
    const audioRef = useRef(null);
    const [audioUrl, setAudioUrl] = useState(undefined);
    const [display, setDisplay] = useState("block");
    const [openModalImage, setOpenModalImage] = React.useState(false);
    const [clickedUrl, setClickedUrl] = useState("");
    const textRef = useRef(null);

    useEffect(() => {
        formatWppMarkdown(textRef);
    }, [textRef]);

    const onClickDownload = async (type) => {
        const response = await api.post(`${session}/download-media`, {message: message}, config);

        if (type === "image") {
            imageRef.current.src = response.data;
            setDisplay("none");
        } else if (type === "video") {
            imageRef.current.src = response.data;
            setDisplay("none");
        } else if (type === "audio") {
            setAudioUrl(response.data);
        }
    };

    const handleOpenModalImage = () => {
        setClickedUrl(imageRef.current.src);
        setOpenModalImage(true);
    };

    const handleCloseModalImage = () => {
        setOpenModalImage(false);
    };

    return (
        <ChatLayout>
            <ImageModal
                open={openModalImage}
                handleClose={handleCloseModalImage}
                message={message}
                image={clickedUrl}
            />

            <MessageContainer side={isMe}>
                <MessageContent side={isMe}>
                    {
                        message.isMedia ? (
                            message.type === "video" ? (
                                <ImageContainer>
                                    <video
                                        ref={imageRef}
                                        src={`data:image/png;base64, ${message.body}`}
                                        controls
                                    />

                                    <div className={"download"} style={{display: display}}
                                         onClick={() => onClickDownload("video")}
                                    />
                                </ImageContainer>
                            ) : message.mimetype === "image/jpeg" ? (
                                <ImageContainer>
                                    <img
                                        ref={imageRef}
                                        src={`data:image/png;base64, ${message.body}`}
                                        loading={"lazy"}
                                        alt={message.caption}
                                        onClick={handleOpenModalImage}
                                    />

                                    <div className={"download"} style={{display: display}}
                                         onClick={() => onClickDownload("image")}
                                    />

                                </ImageContainer>
                            ) : null
                        ) : message.type === "document" ? (
                            <p>
                                Documento
                            </p>
                        ) : message.type === "ptt" ? (
                            <AudioComponent
                                url={audioUrl}
                                isMe={message.fromMe}
                                profileImage={message.sender.profilePicThumbObj.eurl === undefined ? defaultImage : message.sender.profilePicThumbObj.eurl}
                                audioRef={audioRef}
                                downloadAudio={onClickDownload}
                            />
                        ) : message.type === "sticker" ? (
                            <StickerComponent
                                src={message.body}
                                ref={imageRef}
                                onError={() => onClickDownload("image")}
                            />
                            // <StickerComponent src={message.body}/>
                        ) : (
                            <MessageContentText>
                                <span style={{width: "100%"}} ref={textRef}>
                                    {message.body}
                                </span>
                            </MessageContentText>
                        )
                    }
                </MessageContent>
            </MessageContainer>
        </ChatLayout>
    );
};

ChatComponent.propTypes = {
    message: PropTypes.any.isRequired,
    session: PropTypes.string.isRequired,
    isMe: PropTypes.string.isRequired,
};

export default ChatComponent;