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
  width: 100vw;
  height: 100vh;
  background-color: black;

  display: flex;
  flex-direction: column;
  //justify-content: space-between;
`;

export const TopButtons = styled.header`
  border-bottom: 1px solid rgba(255, 255, 255, .5);
  padding: 2em;
  height: 68px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    color: #999;
    margin-right: 2em;
    cursor: pointer;
    transition-duration: 200ms;

    :hover {
      color: #fff;
    }
  }

  .info-user {
    display: flex;
    align-items: center;

    p {
      color: #fff;
      font-size: 1.7rem;
      font-weight: 600;
      cursor: default;
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 15px;
    }
  }
`;

export const ImageComponent = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
