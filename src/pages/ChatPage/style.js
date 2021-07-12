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
import styled from "styled-components";
import bgChat from "../../assets/bg-chat.png";

export const Layout = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
  overflow: hidden;

  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  clear: both;
  max-height: 100vh;
  .emoji-mart.emoji-mart-light {
    position: absolute;
    width: 100% !important;
    left: 0;
    bottom: 120px;
  }

  .emoji-mart {
    position: absolute !important;
    bottom: 60px;
    width: 70vw !important;
    height: 50vh;
    background-color: #f0f0f0;
  }

  .emoji-mart-bar {
    border: 0;
  }

  .emoji-mart-anchors {
    padding: 0;
    border: 0;
  }

  .emoji-mart-anchor-icon {
    color: #a3a3a3;
  }

  .emoji-mart-anchor-selected {
    color: red !important;
  }

  .emoji-mart-anchor-bar {
    background-color: #36aa9f !important;
  }

  .emoji-mart-anchor-icon {
    color: #8b8b8b !important;
  }

  .emoji-mart-search {
    margin: 5px 8px 15px 8px;
  }

  .emoji-mart-search-icon {
    display: none;
  }

  .emoji-mart-search input {
    font-size: 16px;
    display: block;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 0px solid #d9d9d9;
    outline: 0;
    background-color: #e6e6e6;
    color: #4a4a4a;
  }

  .emoji-mart-category-label span {
    display: block;
    width: 100%;
    font-weight: 500;
    padding: 5px 6px;
    color: #b4b4b4;
    background-color: #f0f0f0;
  }

  .emoji-mart-scroll {
    height: 200px;
  }

  .emoji-mart-bar:last-child {
    display: none;
  }

  .emoji-mart {
    position: absolute !important;
    bottom: 60px;
    width: 100vw !important;
    height: 40vh;
  }

  .emoji-mart-category-list {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: center;

  justify-content: space-between;
  width: 100%;

  span {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition-duration: 200ms;

    p {
      border-bottom: 1px solid #000;
    }

    svg {
      margin-right: 10px;
    }

    :hover {
      transform: scale(1.1);
    }
  }
`;

export const SessionsContainer = styled.form`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 2em;

  height: 100%;
  width: 20%;
  min-width: 20%;
  position: relative;
  overflow: auto;

  .plus-button {
    position: absolute;
    bottom: 30px;
    right: 30px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;

    border-radius: 50%;
    background: #007af3;
    width: 50px;
    height: 50px;
    cursor: pointer;
    transition-duration: 200ms;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: #fff;
      width: 30px;
      height: 30px;
    }

    :hover {
      transform: scale(1.05);
      background: #1065ba;
    }
  }

  ul {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    list-style-type: none;

    li {
      margin-top: 1em;
      width: 100%;

      label {
        input[type="radio"] {
          display: none;
        }

        input[type="radio"]:checked + .info-session {
          background: #f4f6f9;
        }

        .info-session {
          display: flex;
          flex-direction: column;
          cursor: pointer;

          padding: 20px 10px;
          border-radius: 7px;

          border: 1px solid #f4f6f9;
          transition-duration: 200ms;

          :hover {
            transform: scale(1.03);
            background: aliceblue;
          }

          small {
            color: #999;
          }

          p {
            font-weight: 600;
          }
        }
      }
    }
  }
`;

export const HeaderContact = styled.header`
  display: flex;
  padding: 5px;
  border-bottom: 1px solid ${({theme}) => theme.colors.separator};

  background: ${({theme}) => theme.colors.background};

  .container-info-ctt {
    display: flex;
    align-items: center;

    width: 100%;

    padding: 0 2em;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 15px;
    }

    h3 {
      font-weight: 500;
      color: ${({theme}) => theme.colors.name_user};
    }
  }
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({theme: {colors}}) => colors.background};


  background: ${({theme}) => theme.colors.background};

  border-radius: 3px;

  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;

  h3 {
    font-size: 1rem;
  }

  .bottom-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    padding: 15px;
    background: ${({theme}) => theme.colors.background};

    .action-buttons {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      button {
        background: transparent;
        border: 0;
        outline: 0;
      }

      div {
        display: flex;
      }
    }

    label {
      display: flex;
      align-items: center;

      input[type="file"] {
        display: none;
      }
    }

    input {
      width: 100%;
      padding: 10px 15px;
      border-radius: 20px;
      border: 0;
      outline: 0;
    }

    svg {
      margin-left: 20px;
      cursor: pointer;
      color: #666;
      transition-duration: 200ms;

      :nth-child(1) {
        margin-left: 10px;
        margin-right: 10px;
      }

      :hover {
        color: #000;
      }
    }

  }

  ul {
    height: 100%;
    overflow: auto;
    padding: 2em;
    list-style-type: none;

    ::-webkit-scrollbar {
      width: 7px;
      height: 7px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #9a9a9a;
      transition-duration: 200ms;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #a5a5a5;
    }

    li {
      display: flex;
      margin-bottom: 10px;
    }
  }

  textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    outline: none;
    height: 70px;
    font-size: 16px;
    background: ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.colors.name_user};
    border: 2px solid ${({theme}) => theme.colors.separator};
    margin-bottom: 10px;
    transition-duration: 200ms;

    :focus {
      border: 2px solid ${({theme}) => theme.colors.focus_textarea};
    }
  }
`;

export const WaitingContainer = styled.div`
  color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  height: 100%;

  img {
    width: 100px;
    height: 100px;
    margin-bottom: 2em;
  }

  h2 {
    font-size: 1.3rem;
  }

  p {
    margin-top: 0.5em;
    width: 350px;
    font-size: 1rem;
  }

  @keyframes pulsate-bck {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const Contador = styled.div`
  display: block;
  width: 160px;
  min-width: 160px;

  .main-cont {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    svg {
      cursor: pointer;
      width: 26px;
      height: 26px;

      :nth-child(1) {
        color: #c25252;
      }

      :nth-child(3) {
        color: #569241;
      }
    }

    .counter {
      p {
        font-size: 16px;
        text-align: center;
      }
    }
  }
`;

export const LoadMoreComponent = styled.button`
  color: #999;
  margin: 0 auto;
  border: 0;
  padding: 10px;
  background: rgba(236, 236, 236, 0.34);
  width: 100%;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 2em;
`;

export const ReplyContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  background: #ccc;
  align-items:center;
  justify-content:center;
  .content{
      flex: 1;
      align-items:center;
      justify-content:center;
  }
`;