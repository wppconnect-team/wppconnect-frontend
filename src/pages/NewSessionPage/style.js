import styled from 'styled-components'

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
`

export const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`


export const Title = styled.h1`
  margin-top: 2em;
  text-align: center;
`

export const Description = styled.p`
  color: #666;
  font-size: 16px;
  font-weight: 400;
  max-width: 500px;
  text-align: center;
  margin-top: 1em;
`

export const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 2em;

  .two-columns {
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      margin-left: 5px;
      cursor: pointer;
    }

    input {
      background: #fff;
      border: 1px solid #E6E8EF;
      box-shadow: 0 2.8px 2.2px rgba(70, 102, 247, 0.034), 0 6.7px 5.3px rgba(70, 102, 247, 0.048), 0 12.5px 10px rgba(70, 102, 247, 0.06), 0 22.3px 17.9px rgba(70, 102, 247, 0.072), 0 41.8px 33.4px rgba(70, 102, 247, 0.086), 0 100px 80px rgba(70, 102, 247, 0.12);
      border-radius: 4px;
      outline: 0;
      padding: 10px;

      :nth-child(2) {
        margin-left: 10px;
      }
    }
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
`

export const ImageCustom = styled.img`
  width: 300px;
  object-fit: cover;
`