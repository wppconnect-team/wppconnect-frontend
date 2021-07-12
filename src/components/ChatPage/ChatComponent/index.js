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
import React, { useEffect, useRef, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {
  ChatLayout,
  DocumentComponent,
  ImageContainer,
  MessageContainer,
  MessageContent,
  MessageContentText,
  StickerComponent,
} from "./style";
import AudioComponent from "../AudioComponent";
import api from "../../../services/api";
import ImageModal from "./ImageModal";
import PropTypes from "prop-types";
import config from "../../../util/sessionHeader";
import formatWppMarkdown from "../../../util/functionsMarkdown";
import { QuotedMessage } from "./QuotedMessage";
import { Download } from "react-feather";
import { AlertDialog } from "../../AlertDialog";
import { toast } from "react-toastify";

const defaultImage =
  "https://pbs.twimg.com/profile_images/1259926100261601280/OgmLtUZJ_400x400.png";

const ChatComponent = ({
  message,
  session,
  isMe,
  isWarning,
  selectMessageId,
}) => {
  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState(undefined);
  const [display, setDisplay] = useState("block");
  const [openModalImage, setOpenModalImage] = useState(false);
  const [clickedUrl, setClickedUrl] = useState("");
  const textRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    formatWppMarkdown(textRef);
  }, [textRef]);

  const onClickDownload = async (type, option) => {
    const response = await api.get(
      `${session}/get-media-by-message/${message.id}`,
      config()
    );

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

  function getMessageTime(m) {
    const date = new Date(m.timestamp * 1000);
    const lang = navigator.language || navigator.languages[0];
    const date_locale = date.toLocaleDateString(lang, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const time_locale = date.toLocaleTimeString(lang);
    const formatted = `${date_locale} ${time_locale}`;
    return (
      <div style={{ marginTop: 5 }}>
        <small>
          <strong>{formatted}</strong>
        </small>
      </div>
    );
  }

  function getSender(m) {
    let sender = m?.sender?.id?.user;
    if (m.sender) {
      const key = [
        "name",
        "shortName",
        "pushname",
        "verifiedName",
        "formattedName",
      ].find((n) => {
        if (n in m.sender && !!String(m.sender[n]).trim()) {
          return m.sender[n];
        }
      });
      sender = m.sender[key];
    }
    return sender;
  }

  function getReason(m) {
    try {
      const sender = getSender(m);
      if (m.type === "revoked") return `${sender} apagou mensagem`;
      if (m.type === "gp2") {
        let users = [];
        if (m.recipients && Array.isArray(m.recipients)) {
          users = m.recipients.reduce(
            (c, acc, i) => c + (i > 0 ? ", " : "") + acc.user,
            ""
          );
        }
        if (m.subtype === "leave") return `${m?.recipients[0]?.user} saiu`;
        if (m.subtype === "remove") return `${sender} removeu \n${users}`;
        if (m.subtype === "add") return `${sender} adicionou \n${users}`;
      }
    } catch (error) {
      return "";
    }
  }

  function getBodyMessage() {
    if (!!message?.body && message.type === "chat") return message.body;
    if (
      !!message?.body &&
      message.type === "gp2" &&
      message.subtype === "picture"
    ) {
      const sender = getSender(message);
      return `${sender} Alterou a imagem do grupo`;
    }

    if (!message?.body) return getReason(message);
  }

  const options = [
    {
      label: "Responder",
      method() {
        setAnchorEl(null);
        selectMessageId();
      },
    },
    {
      label: "Apagar",
      method() {
        setAnchorEl(null);
        setOpenDeleteDialog(true);
      },
    },
  ];

  return (
    <ChatLayout side={isMe}>
      <ImageModal
        open={openModalImage}
        handleClose={handleCloseModalImage}
        message={message}
        image={clickedUrl}
      />

      <MessageContainer side={isMe} isWarning={isWarning}>
        <div style={{ position: "absolute", right: -5, top: -5, zIndex: 10 }}>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 300,
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.label} onClick={() => option.method()}>
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </div>

        {!message.fromMe && (
          <span className="msg-title-top">
            <small>
              {message.sender?.name || message.sender?.id?.user} -{" "}
              {message?.sender?.pushname}
            </small>
          </span>
        )}
        <MessageContent side={isMe} isWarning={isWarning}>
          {message.isMedia ? (
            message.type === "video" ? (
              <ImageContainer>
                <video
                  ref={imageRef}
                  src={`data:image/png;base64, ${message.body}`}
                  controls
                />

                <div
                  className={"download"}
                  style={{ display: display }}
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

                <div
                  className={"download"}
                  style={{ display: display }}
                  onClick={() => onClickDownload("image")}
                />
              </ImageContainer>
            ) : null
          ) : message.type === "document" ? (
            <DocumentComponent
              side={isMe}
              isWarning={isWarning}
              onClick={() =>
                onClickDownload("document", {
                  mimetype: message.mimetype,
                  filename: message.filename,
                  mediadata: message.mediadata,
                })
              }
            >
              <p>{message.filename}</p>
              <Download />
            </DocumentComponent>
          ) : message.type === "ptt" ? (
            <AudioComponent
              url={audioUrl}
              isMe={message.fromMe}
              profileImage={
                !message?.sender?.profilePicThumbObj?.eurl
                  ? defaultImage
                  : message?.sender?.profilePicThumbObj?.eurl
              }
              audioRef={audioRef}
              downloadAudio={onClickDownload}
            />
          ) : message.type === "sticker" ? (
            <StickerComponent
              src={message.body}
              ref={imageRef}
              onError={() => onClickDownload("image")}
            />
          ) : (
            // <StickerComponent src={message.body}/>
            <MessageContentText isWarning={isWarning}>
              {!!message.quotedMsg && <QuotedMessage message={message} />}
              <div ref={textRef}>{getBodyMessage()}</div>
            </MessageContentText>
          )}
        </MessageContent>
        {message.caption && <span className="caption">{message.caption}</span>}
        {getMessageTime(message)}
      </MessageContainer>

      {openDeleteDialog && (
        <AlertDialog
          title="Confirma Apagar?"
          content="Se for possível será apagado para todos, senão, somente para você"
          confirm={async () => {
            try {
              await api.post(
                `${session}/delete-message`,
                {
                  phone: message.from.replace("@c.us", ""),
                  messageId: message.id,
                },
                config()
              );
            } catch (error) {
              toast.error("Não foi possível apagar", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } finally {
              setOpenDeleteDialog(false);
            }
          }}
          close={() => setOpenDeleteDialog(false)}
        />
      )}
    </ChatLayout>
  );
};

ChatComponent.propTypes = {
  message: PropTypes.any.isRequired,
  session: PropTypes.string.isRequired,
  isMe: PropTypes.string.isRequired,
};

export default ChatComponent;
