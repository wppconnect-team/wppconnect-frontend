import styled from "styled-components";

export const Layout = styled.div`
  height: 100%;
  width: 80%;

  display: flex;
  overflow: hidden;

  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  height: 100%;
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
`;

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
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #e5ddd5;

  border-radius: 3px;
  border: 1px solid #e9e9e9;

  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;

  h3 {
    font-size: 1.5rem;
  }

  .bottom-container {
    display: flex;
    align-items: center;

    width: 100%;
    padding: 15px;
    border-top: 1px solid rgba(0, 0, 0, .1);
    background: #f0f0f0;

    label {
      input[type=file] {
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

    :hover {
      ::-webkit-scrollbar {
        width: 7px;
        height: 7px;
      }
    }

    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #929090;
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
`;

export const WaitingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  height: 100%;

  img {
    width: 200px;
    margin-bottom: 2em;
  }

  h2 {
    font-size: 2rem;
  }

  p {
    margin-top: .5em;
    color: #000;
    width: 350px;
    font-size: 1.5rem;
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