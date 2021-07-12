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
import styled, { css } from "styled-components";
import DownloadImage from "../../../assets/ic_download_chat.svg";

export const ChatLayout = styled.div`
  width: 100%;
  ${({ side }) =>
    side !== "left" &&
    css`
      display: flex;
      flex-direction: row-reverse;
    `};
`;

export const MessageContainer = styled.div`
  .msg-title-top {
    margin-bottom: 10px;
    padding-right: 20px;
    width: fit-content;
    color: #28a745;
    font-weight: bold;
  }

  width: fit-content;
  font-size: 14px;
  height: auto;
  position: relative;
  display: flex;
  padding: 5px 10px;
  flex-direction: column;
  flex-wrap: wrap;
  color: ${({ side }) => (side === "left" ? "#333" : "#fff")};
  border-radius: 5px;

  ${({ isWarning }) =>
    !isWarning &&
    css`
      background: ${({ side }) => (side === "left" ? "#F3F3F5" : "#6A30FF")};
    `}
  .caption {
    bottom: 0;
    padding: 10px;
  }

  ${({ isWarning }) =>
    isWarning &&
    css`
      width: 100%;
      color: ${({ theme }) => theme.colors.name_user};
      text-align: center;

      .msg-title-top,
      span {
        width: 100%;
        text-align: center;
      }
    `}
`;

export const MessageContent = styled.div`
  display: flex;
  margin: 3px 0;
  position: relative;

  ${({ isWarning }) =>
    isWarning
      ? css`
          max-width: 100%;
          text-align: center;
        `
      : css`
          max-width: 300px;
        `}
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
  min-width: 300px;
  max-height: 300px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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
  ${({ isWarning }) =>
    isWarning &&
    css`
      max-width: 500px;
    `}
  background: #f0f0f0;
  color: #333;
  padding: 1em 10px;
  min-width: 250px;
  border-radius: 5px;
  cursor: pointer;

  svg {
    color: #909090;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.separator};
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
  margin: 3px 0;
  position: relative;
  overflow-wrap: break-word;
  white-space: pre-wrap;

  a {
    color: ${({ side }) => (side === "left" ? "#333" : "#fff")};
  }
`;
