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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  
  ::-webkit-scrollbar-track {
    //background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #fff;
    transition-duration: 200ms;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #fff;
  }

  :hover {
    transition-duration: 200ms;
    
    ::-webkit-scrollbar-thumb:hover {
      background: #a5a5a5;
    }

    ::-webkit-scrollbar-thumb {
      background: #929090;
      border-radius: 10px;
    }
  }
`;

export const Header = styled.header`
  padding: 1.5em 2em;
  display: flex;
  flex-direction: column;

  #ic_plus {
    width: 50px;
    height: 50px;
    margin: 0 auto;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }

  h2 {
    margin-bottom: 0;
    color: #000;
    font-weight: 600;
    font-size: 20px;
    text-align: center;
  }

  .description {
    font-size: 14px;
    color: #666;
    font-weight: 400;
  }

  svg {
    cursor: pointer;
  }
`;

export const ListMenu = styled.div`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0 2em;

  #profile-image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-bottom: 2em;

    input {
      display: none;
    }

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
    }

    label {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1em;

      span {
        background: rgb(106, 66, 205);
        padding: 10px 20px;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        transition-duration: 200ms;
        font-weight: 600;
        border: 0;

        margin: 0 auto;
        margin-top: 10px;
        box-shadow: 0 0 10px 1px rgb(106 66 205 / 70%);
        font-size: 12px;
        
        :hover {
          background: #4237af;
        }
        
      }
    }

  }

  .container {
    display: flex;
    flex-direction: column;

    p {
      font-size: 12px;
    }

    textarea {
      outline: 0;
      margin-bottom: 1em;
      padding: 10px;
      background: #fff;
      border: 1px solid rgba(0, 0, 0, .2);
      border-radius: 3px;

      :disabled {
        cursor: not-allowed;
        color: #999;
      }

      :hover {
        border: 1px solid rgba(0, 0, 0, 1);
      }
      
      :focus {
        border: 2px solid #606BD6;
      }
    }
  }

  p {
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

export const Input = styled.input`
  width: 100%;
  outline: 0;
  margin-bottom: 1em;
  padding: 10px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, .2);
  min-height: 36px;
  border-radius: 3px;

  :disabled {
    cursor: not-allowed;
    color: #999;
  }
  
  :hover {
    border: 1px solid rgba(0, 0, 0, 1);  
  }

  :focus {
    border: 2px solid #606BD6;
  }
`;

export const Footer = styled.footer`
  padding: 1em 2em;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

export const CancelButton = styled.button`
  //background: rgb(106, 66, 205);
  background: #f3f3f3;
  color: #000;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition-duration: 200ms;
  border: 0;

  :hover {
    background: #b8b8b8;
  }
`;

export const Button = styled.button`
  background: rgb(106, 66, 205);
  padding: 10px 20px;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition-duration: 200ms;
  margin-left: 1em;
  font-weight: 600;
  border: 0;

  :hover {
    background: #4237af;
  }
`;