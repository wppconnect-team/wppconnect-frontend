import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, .9);
  border-radius: 10px;

  width: 30%;
  height: 50%;
  
  h2 {
    font-size: 36px;
    font-weight: 500;
    margin-top: -1em;
    margin-bottom: 1em;
  }

  .buttons {
    display: flex;
    margin-top: 2em;
    
    div {
      transition-duration: 200ms;
      
      :hover {
        transform: scale(1.1);
      }
    }
    
    svg {
      color: #fff;
    }

    .cancel {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #cd4242;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;

    }

    .finish {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #42cd50;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      margin-left: 3em;
      cursor: pointer;

    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

export const AudioComponent = styled.div`
  width: 300px;
  height: 200px;
`;