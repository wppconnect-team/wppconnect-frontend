import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const Header = styled.header`
  padding: 1.5em 2em;
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    justify-content: space-between;
  }

  h2 {
    margin-bottom: 0;
    color: #000;
    font-weight: 600;
    font-size: 20px;
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
    width: 200px;
    height: 200px;
    margin: auto;
    margin-bottom: 2em;
    position: relative;

    input {
      display: none;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .edit-icon {
      background: #fff;
      position: absolute;
      top: 5px;
      right: 5px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, .5);
      padding: 10px;
      cursor: pointer;

      svg {
        width: 20px;
        height: 20px;
        pointer-events: none;
      }
    }
  }

  .container {
    display: flex;
    flex-direction: column;

    textarea {
      outline: 0;
      margin-bottom: 1em;
      padding: 10px;
      background: #fff;
      border: 1px solid rgba(0, 0, 0, .1);
      border-radius: 10px;

      :disabled {
        cursor: not-allowed;
        color: #999;
      }
    }
  }

  p {
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

export const InputCustom = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  position: relative;

  input, select {
    width: 100%;
    outline: 0;
    margin-bottom: 1em;
    padding: 10px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, .1);
    min-height: 48px;
    border-radius: 10px;

    :disabled {
      cursor: not-allowed;
      color: #999;
    }

    :focus + span, :not([value=""]) + span {
      font-size: 10px;
      top: -7px;
      padding: 0 5px;
      transition: .1s all ease;
      background: #fff;

      svg {
        width: 15px;
        height: 15px;
      }
    }
  }

  span {
    display: flex;
    align-items: center;
    background: transparent;
    color: #999;
    position: absolute;
    left: 10px;
    top: 13px;
    font-size: 14px;
    pointer-events: none;
    font-weight: 500;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Footer = styled.footer`
  padding: 1em 2em;

  display: flex;
  justify-content: flex-end;
  width: 100%;
  border-top: 1px solid #F8F8F8;
`;

export const CancelButton = styled.button`
  //background: rgb(106, 66, 205);
  background: #f3f3f3;
  color: #000;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 15px;
  cursor: pointer;
  transition-duration: 200ms;
  border: 0;

  :hover {
    background: #b8b8b8;
  }
`;

export const SendButton = styled.button`
  background: rgb(106, 66, 205);
  padding: 10px 20px;
  color: #fff;
  border-radius: 15px;
  cursor: pointer;
  transition-duration: 200ms;
  margin-left: 1em;
  font-weight: 600;
  border: 0;

  :hover {
    background: #4237af;
  }
`;