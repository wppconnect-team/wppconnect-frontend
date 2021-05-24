import React, {useEffect, useRef, useState} from "react";
import {
    ChatLayout, DocumentComponent,
    ImageContainer,
    MessageContainer,
    MessageContent,
    MessageContentText,
    MessageHeaderText,
    StickerComponent
} from "./style";
import AudioComponent from "../AudioComponent";
import api from "../../../services/api";
import ImageModal from "./ImageModal";
import PropTypes from "prop-types";
import config from "../../../util/sessionHeader";
import formatWppMarkdown from "../../../util/functionsMarkdown";
import {Download} from "react-feather";

const defaultImage = "https://pbs.twimg.com/profile_images/1259926100261601280/OgmLtUZJ_400x400.png";

const ChatComponent = ({message, session, isMe,sendHeader}) => {
    const imageRef = useRef(null);
    const audioRef = useRef(null);
    const [audioUrl, setAudioUrl] = useState(undefined);
    const [display, setDisplay] = useState("block");
    const [openModalImage, setOpenModalImage] = React.useState(false);
    const [clickedUrl, setClickedUrl] = useState("");
    const textRef = useRef(null);
    const messageHeader = getMessageHeader();

    useEffect(() => {
        formatWppMarkdown(textRef);
    }, [textRef]);

    function getMessageHeader() {
        let msg = "";
        if(message.isGroupMsg && message.sender  && message.sender.name){
            msg += `${message.sender.name} - `;
        }

        let dt = new Date(message.timestamp * 1000);
        msg += `${dt.getHours()}:${dt.getMinutes()} - ${dt.getDate()}/${dt.getMonth()} `;
        return msg;
    }

    const onClickDownload = async (type, option) => {
        const response = await api.get(`${session}/get-media-by-message/${message.id}`, config);

        if (type === "image") {
            imageRef.current.src = `data:image/png;base64, ${response.data}`;
            setDisplay("none");
        } else if (type === "video") {
            imageRef.current.src = `data:video/webm;base64, ${response.data}`;
            setDisplay("none");
        } else if (type === "audio") {
            setAudioUrl(`data:audio/ogg;base64, ${response.data}`);
        } else if (type === "document") {
            const a = document.createElement("a");
            a.href = `data:${option.mimetype};base64, ${response.data}`;
            a.download = `${option.filename}`;
            a.click();
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
                {
                    sendHeader ? (
                        <MessageHeaderText side={isMe}>
                            <span>{messageHeader}</span>
                        </MessageHeaderText>
                    ) : (
                        ""
                    )
                }
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
                            <DocumentComponent
                                side={isMe}
                                onClick={() => onClickDownload("document", {
                                    mimetype: message.mimetype,
                                    filename: message.filename,
                                    mediadata: message.mediadata
                                })}>
                                <p>{message.filename}</p>

                                <Download/>
                            </DocumentComponent>
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
    sendHeader: PropTypes.string.isRequired,
};

export default ChatComponent;