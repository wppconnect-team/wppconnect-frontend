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
import styled, { createGlobalStyle } from "styled-components";

export const Layout = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export default createGlobalStyle`
  :root {
    --background: #fff;
    --primary: #F7007E;
    --secondary: #606BD6;
    --blue: #79C8F8;
    --black: #000;
    --white: #fff;
    --gray: #666;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Jost", sans-serif;
  }

  html {
    font-size: 14px;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  body {
    height: 100vh;
    background: var(--background);
  }

  #root {
    min-height: 100vh;
  }

  .saida-bottom-top {
    animation: saida-bottom 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  }

  @keyframes saida-bottom {
    0% {
      transform: scaleY(1);
      transform-origin: 100% 0%;
      opacity: 1;
    }
    100% {
      transform: scaleY(0);
      transform-origin: 100% 0%;
      opacity: 1;
    }
  }

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
    /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
  }
`;