import styled from 'styled-components'
import ImageBg from '../../assets/bgarticle.svg'

export const Layout = styled.div`
  height: 100%;
  width: 100%;

  display: flex;

  justify-content: center;
  align-items: center;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-image: url("${ImageBg}");
    background-size: cover;
    background-position: top center;
    filter: blur(10px);
    opacity: .3;
    overflow: hidden;
    width: 100%;
  }
`

export const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 500px;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`

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
`


export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #F4F6FB;

  border-radius: 3px;
  border: 1px solid #e9e9e9;

  width: 100%;
  margin-top: 2em;

  max-height: 400px;

  ul {
    height: 100%;
    overflow: auto;
    padding: 2em;
    list-style-type: none;

    li {
      display: flex;
      padding-bottom: 1em;
      padding-top: 1em;

      .left {
        background: #fff;
        margin-right: 20px;
        font-size: 14px;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
        color: #000;
        height: auto;
        display: block;
        padding: 10px 10px;
        border-radius: 20px 20px 20px 20px;
        position: relative;
      }

      .right {
        margin: 0 0 0 auto;
        max-width: 300px;
        font-size: 14px;
        background: #DCF8C6;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
        color: #000;
        height: auto;
        padding: 10px 10px;
        border-radius: 20px 20px 20px 20px;
      }

      :nth-child(1) {
        padding-top: 0;
      }

      small {
        color: #9ca3a7;
      }

      p {
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 5px;
      }

    }
  }
`

export const Formulario = styled.form`
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  width: 100%;

  input, select {
    background: #fff;
    padding: 10px;
    border: 1px solid #e9e9e9;
    border-radius: 3px;
    outline: 0;

    :focus {
      outline: none;
      border-color: #9ecaed;
      box-shadow: 0 0 10px #9ecaed;
    }
  }

  div {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 10px;

    select {
      width: 100%;
    }

    input {
      width: 100%;

      :nth-child(2) {
        margin-left: 10px;
      }
    }

    svg {
      margin-left: 1em;
      color: #2E71FF;
    }

    button {
      background: transparent;
      border: 0;
      outline: 0;
      cursor: pointer;
    }
  }
`

export const WaitingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  img {
    width: 200px;
    margin-bottom: 2em;
    animation: pulsate-bck 2s ease-in-out infinite both;
  }

  p {
    margin-top: .5em;
    color: #9ca3a7;
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

`