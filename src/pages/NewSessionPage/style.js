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
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;


export const Title = styled.h1`
  margin-top: 2em;
  text-align: center;
  font-size: 3rem;
  font-weight: 500;
`;

export const Description = styled.p`
  color: #666;
  font-size: 16px;
  font-weight: 400;
  max-width: 500px;
  text-align: center;
  margin-top: 1em;
`;

export const ImageCustom = styled.img`
  width: 300px;
  object-fit: cover;
  margin: 3em auto;
`;

export const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2em;

  p {
    font-size: 1.5rem;
    font-weight: 500;
  }

  .inline {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 2em;

    div {
      display: flex;
      align-items: center;
      width: 100%;

      input {
        width: 100%;
        margin-right: 1em;
      }

      svg {
        cursor: pointer;
      }
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

    box-shadow: 0 2.8px 2.2px rgba(70, 102, 247, 0.034),
    0 6.7px 5.3px rgba(70, 102, 247, 0.048),
    0 12.5px 10px rgba(70, 102, 247, 0.06),
    0 22.3px 17.9px rgba(70, 102, 247, 0.072),
    0 41.8px 33.4px rgba(70, 102, 247, 0.086),
    0 100px 80px rgba(70, 102, 247, 0.12);

    &:hover {
      background: #263fb1;
      transition-duration: 200ms;
    }

    &:disabled {
      background: #5b5e78;
      cursor: not-allowed;
    }
  }
`;