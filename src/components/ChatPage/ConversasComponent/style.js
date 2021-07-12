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

export const Layout = styled.aside`
  display: flex;
  flex-direction: column;
  background: ${({theme}) => theme.colors.background};

  height: 100%;
  width: 35rem;
  min-width: 20%;
  overflow: hidden auto;

  position: relative;
  transition-duration: 200ms;

  ::-webkit-scrollbar {
    width: 2px;
    height: 7px;
  }

  ::-webkit-scrollbar-track {
    background: ${({theme}) => theme.colors.separator};
  }

  ::-webkit-scrollbar-thumb {
    background: #929090;
    transition-duration: 200ms;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({theme}) => theme.colors.separator};
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 400;
    margin-left: 1em;
  }

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding: .5em;

    li {
      transition-duration: 200ms;
      border-radius: 8px;

      :hover {
        background: ${({theme}) => theme.colors.hover_chat};
      }
    }

    .active {
      background: ${({theme}) => theme.colors.hover_chat};
    }
  }
`;

export const SearchComponent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 2em;
  transition-duration: 200ms;
  position: sticky;
  top: 0;
  padding: 1em 2em;
  //background: #2a2f32;

  background: ${({theme}) => theme.colors.background};
  border-bottom: 1px solid ${({theme}) => theme.colors.separator};
  z-index: 1;

  svg {
    width: 15px;
    height: 15px;

    :nth-child(2) {
      margin-left: 10px;
    }
  }

  input {
    border: 0;
    width: 100%;
    margin-left: .5em;
    outline: 0;
    background: ${({theme}) => theme.colors.hover_chat};
    padding: 10px;
    border-radius: 5px;
  }

  :hover {
    input {
      //cursor: pointer;
    }
  }
`;

export const ContactInfo = styled.label`
  input[type=radio] {
    display: none;
  }

  input[type=radio]:checked + .contact-info {
    background: #F4F6F9;
  }
`;

export const UserData = styled.div`
  display: flex;
  cursor: pointer;

  padding: 20px 10px;

  transition-duration: 200ms;


  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
  }

  .principal-info {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .contact-name {
    font-weight: 500;
    font-size: 1rem;
    color: ${({theme}) => theme.colors.name_user};
  }

  .contact-message {
    display: flex;
    position: relative;
    width: 100%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;

    color: ${({theme}) => theme.colors.message_content};
    font-weight: 400;

    .left {
      font-size: 1rem;
      position: relative;
      flex-grow: 1;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 200px;
    }

    .unread-message {
      position: absolute;
      right: 0;
      margin-left: 10px;

      width: 15px;
      height: 15px;
      background: #6163FF;
      box-shadow: 0 0 10px 1px rgb(115 103 240 / 70%);
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;

      p {
        font-weight: 600;
      }
    }
  }
`;