import styled from "styled-components";
import DownloadImage from "../../../assets/icons8-down-arrow-96.png";

export const ChatLayout = styled.div`
  width: 100%;
`;

export const MessageContainer = styled.div`
  font-size: 14px;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;

  margin: ${({side}) => side === "left" ? "0 20px 0 0" : "0 0 0 auto"};
`;

export const MessageContent = styled.span`
  background: ${({side}) => side === "left" ? "#fff" : "#DCF8C6"};
  display: flex;
  padding: 5px 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: ${({side}) => side === "left" ? "0 auto 0 0" : "0 0 0 auto"};
  max-width: ${({side}) => side === "left" ? "300px" : "300px"};
  position: relative;

  span {
    display: block;
    width: 100%;
  }

  .download {
    position: absolute;
    background-image: url("${DownloadImage}");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    padding: 2em;
    margin: auto;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 80px;
    height: 80px;
  }
`;

export const ImageContainer = styled.div`
  width: 500px;
  max-height: 300px;
  cursor: pointer;
  display: flex;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;

export const DocumentComponent = styled.div`
  width: 100%;
  background: ${({side}) => side === "left" ? "#f0f0f0" : "#cfe9ba"};
  padding: 1em 10px;
  min-width: 250px;
  border-radius: 5px;
  cursor: pointer;

  svg {
    color: #909090;
    border-radius: 50%;
    border: 1px solid rgba(144, 144, 144, .5);
    padding: 5px;
    width: 30px;
    height: 30px;
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StickerComponent = styled.img`
  width: 125px;
  height: 125px;
  object-fit: contain;
`;

export const MessageContentText = styled.div`
  width: 100%;

  position: relative;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

export const MessageHeaderText = styled.div`
  display: flex;
  padding: 5px 0px;
  border-radius: 5px;
  margin: ${({side}) => side === "left" ? "0 auto 0 0" : "0 0 0 auto"};
  position: relative;
  font-size: 1rem;
  color: #999;
  font-family: "Inter",sans-serif;
  
`;