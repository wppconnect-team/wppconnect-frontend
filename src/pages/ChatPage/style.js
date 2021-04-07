import styled from 'styled-components'
import ImageBg from '../../assets/bgarticle.svg'
import ChatBg from '../../assets/bg-chat.png'

export const Layout = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  overflow: hidden;

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

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  clear: both;
  max-height: 100vh;
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
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;

    border-radius: 50%;
    background: #007AF3;
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
        input[type=radio] {
          display: none;
        }

        input[type=radio]:checked + .info-session {
          background: #F4F6F9;
        }

        .info-session {
          display: flex;
          flex-direction: column;
          cursor: pointer;

          padding: 20px 10px;
          border-radius: 7px;

          border: 1px solid #F4F6F9;
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
`

export const HeaderContact = styled.header`
  display: flex;
  height: 68px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  background: #fff;

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
      font-weight: 400;
    }
  }
`

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #e5ddd5;

  border-radius: 3px;
  border: 1px solid #e9e9e9;

  width: 60%;
  height: 100%;
  position: relative;
  z-index: 1;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url("${ChatBg}");
    z-index: -1;
    opacity: .1;
  }

  .bottom-container {
    display: flex;
    align-items: center;

    width: 100%;
    padding: 15px;
    border-top: 1px solid rgba(0, 0, 0, .1);
    background: #f0f0f0;

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

    li {
      display: flex;
      margin-bottom: 10px;
    }
  }
`

export const WaitingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  height: 100%;

  div {
    background: #fff;
    border-radius: 50%;
    width: 70%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 200px;
    margin-bottom: 2em;
  }

  p {
    margin-top: .5em;
    color: #9ca3a7;
    width: 350px;
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