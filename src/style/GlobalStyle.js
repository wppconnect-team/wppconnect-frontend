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
    font-family: "Inter", sans-serif;
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