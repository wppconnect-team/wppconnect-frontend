import styled from 'styled-components'

export const Layout = styled.label`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 2em;

  height: 100%;
  width: 20%;
  min-width: 20%;
  overflow: auto;

  position: relative;

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    list-style-type: none;

    li {
      margin-top: 1em;


    }

  }
`

export const ContactInfo = styled.label`
  input[type=radio] {
    display: none;
  }

  input[type=radio]:checked + .contact-info {
    background: #F4F6F9;
  }
`

export const UserData = styled.div`
  display: flex;
  cursor: pointer;

  padding: 20px 10px;
  border-radius: 7px;

  border: 1px solid #F4F6F9;
  transition-duration: 200ms;

  :hover {
    transform: scale(1.03);
    background: aliceblue;
  }

  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
  }

  .principal-info {
    display: flex;
    flex-direction: column;
  }

  .contact-phone {
    color: #999;
  }

  .contact-name {
    font-weight: 600;
  }
`