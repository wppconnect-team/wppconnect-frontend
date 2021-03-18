import styled from 'styled-components'
import ImageBg from '../../assets/bgarticle.svg'

export const Layout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  z-index: 1;

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
    overflow: hidden;
    width: 100%;
  }

  .animation {
    animation: wobble-hor-bottom 2s both infinite;
  }

  @keyframes wobble-hor-bottom {
    0%,
    100% {
      transform: translateX(0%);
      transform-origin: 50% 50%;
    }
    15% {
      transform: translateX(-30px) rotate(-6deg);
    }
    30% {
      transform: translateX(15px) rotate(6deg);
    }
    45% {
      transform: translateX(-15px) rotate(-3.6deg);
    }
    60% {
      transform: translateX(9px) rotate(2.4deg);
    }
    75% {
      transform: translateX(-6px) rotate(-1.2deg);
    }
  }
`

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .container-session {
    max-width: 500px;
    text-align: center;
  }
`

export const ImageCustom = styled.img`
  width: 300px;
  object-fit: cover;
`

export const Title = styled.h1`
  margin-top: 2em;
`

export const Description = styled.p`
  color: #666;
  font-size: 16px;
  font-weight: 400;
`

export const Formulario = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 2em;

  input {
    background: #fff;
    border: 1px solid #E6E8EF;
    box-shadow: 0 2.8px 2.2px rgba(70, 102, 247, 0.034), 0 6.7px 5.3px rgba(70, 102, 247, 0.048), 0 12.5px 10px rgba(70, 102, 247, 0.06), 0 22.3px 17.9px rgba(70, 102, 247, 0.072), 0 41.8px 33.4px rgba(70, 102, 247, 0.086), 0 100px 80px rgba(70, 102, 247, 0.12);
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