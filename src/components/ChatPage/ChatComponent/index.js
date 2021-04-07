import React, {useRef, useState} from 'react';
import {
    ChatLayout,
    ImageContainer,
    MessageContainer,
    MessageContent,
    StickerComponent,
    VideoContainer
} from "./style";
import AudioComponent from "../AudioComponent";
import api from "../../../services/api";

const defaultImage = 'https://pbs.twimg.com/profile_images/1259926100261601280/OgmLtUZJ_400x400.png'

const ChatComponent = ({message, session, token, isMe}) => {
    const imageRef = useRef(null);
    const audioRef = useRef(null);
    const [audioUrl, setAudioUrl] = useState(undefined);
    const [display, setDisplay] = useState('block');

    const onClickDownload = async (type) => {
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        const response = await api.post(`${session}/download-media`, {
                message: message
            }, config
        );

        if (type === 'image') {
            imageRef.current.src = response.data;
            setDisplay('none');
        } else if (type === 'video') {
            imageRef.current.src = response.data;
            setDisplay('none');
        } else if (type === 'audio') {
            setAudioUrl(response.data);
        }
    }

    return (
        <ChatLayout>
            <MessageContainer side={isMe}>
                <MessageContent side={isMe}>
                    {
                        message.isMedia ? (
                            message.mimetype === 'video/mp4' ? (
                                <ImageContainer>
                                    <video
                                        ref={imageRef}
                                        src={`data:image/png;base64, ${message.body}`}
                                        controls
                                    />

                                    <div className={"download"} style={{display: display}}
                                         onClick={() => onClickDownload('video')}
                                    />
                                </ImageContainer>
                            ) : message.mimetype === 'image/jpeg' ? (
                                <ImageContainer>
                                    <img
                                        ref={imageRef}
                                        src={`data:image/png;base64, ${message.body}`}
                                        loading={"lazy"}
                                        alt={""}
                                    />

                                    <div className={"download"} style={{display: display}}
                                         onClick={() => onClickDownload('image')}
                                    />

                                </ImageContainer>
                            ) : null
                        ) : message.type === 'ptt' ? (
                            <AudioComponent
                                url={audioUrl}
                                isMe={message.fromMe}
                                profileImage={message.sender.profilePicThumbObj.eurl === undefined ? defaultImage : message.sender.profilePicThumbObj.eurl}
                                audioRef={audioRef}
                                downloadAudio={onClickDownload}
                            />
                        ) : message.type === 'sticker' ? (
                            <StickerComponent
                                src={message.body}
                                ref={imageRef}
                                onError={() => onClickDownload('image')}
                            />
                            // <StickerComponent src={message.body}/>
                        ) : message.body
                    }
                </MessageContent>
            </MessageContainer>
        </ChatLayout>
    );
};

export default ChatComponent;
