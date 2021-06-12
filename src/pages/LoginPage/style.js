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

export const Layout = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  overflow: hidden;

  justify-content: center;
  align-items: center;
  position: relative;

  .close-item {
    position: absolute;
    top: 2em;
    right: 2em;

    cursor: pointer;
  }
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  .container-session {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    #left-div {
      width: 60%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F8F8F8;

      img {
        width: 500px;
        height: 500px;
        object-fit: contain;
      }
    }

    #right-div {
      width: 40%;
      height: 100vh;
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 2em;
    }
  }
`;


export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 500;
  color: #444;
`;

export const Description = styled.p`
  color: #555;
  font-size: 16px;
  font-weight: 300;
  margin-top: 1em;
`;

export const ImageCustom = styled.img`
  width: 300px;
  object-fit: cover;
  margin: 0 auto;
`;

export const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;

  small {
    font-size: 12px;
  }
  
  .top-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2em;
    margin-bottom: 10px;

    span {
      color: #4666F7;
      border-bottom: 1px solid #4666F7;
      cursor: pointer;
    }
  }

  input {
    background: #fff;
    border: 1px solid #d5d7da;
    border-radius: 4px;
    outline: 0;
    padding: 10px;
  }

  button {
    background: #4666F7;
    padding: 10px 25px;
    border: 0;
    color: #fff;
    outline: 0;
    cursor: pointer;
    transition-duration: 200ms;
    margin-top: 1em;
    border-radius: 5px;

    &:hover {
      background: #263fb1;
      box-shadow: 0 2.8px 2.2px rgba(70, 102, 247, 0.034),
      0 6.7px 5.3px rgba(70, 102, 247, 0.048),
      0 12.5px 10px rgba(70, 102, 247, 0.06),
      0 22.3px 17.9px rgba(70, 102, 247, 0.072),
      0 41.8px 33.4px rgba(70, 102, 247, 0.086),
      0 100px 80px rgba(70, 102, 247, 0.12);
    }

    &:disabled {
      background: #5b5e78;
      cursor: not-allowed;
    }
  }
`;