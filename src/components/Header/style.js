import styled from 'styled-components'

export const Layout = styled.header`
  width: 100%;
  height: 68px;
  display: flex;
  background: #fff;
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 2em;
`

export const LogoWPP = styled.span`
  font-size: 20px;
  cursor: pointer;

  b {
    color: #007AF3
  }
  
  small {
    font-weight: 400;
    color: #999;
    font-size: 14px;
    cursor: default;
  }
`

export const Buttons = styled.nav`
  display: flex;

  ul {
    display: flex;
    align-items: center;
    list-style-type: none;
    
    li {
      display: flex;
      align-items: center;
      margin-left: 20px;
      transition-duration: 200ms;
      border-bottom: 1px solid #fff;

      :hover {
        border-bottom: 1px solid #000;
      }

      svg {
        margin-right: 10px;
      }
    }
  }
`

export const Link = styled.a`
  display: flex;
  align-items: center;
  
  font-weight: 600;
  cursor: pointer;
  color: #000;
  text-decoration: none;
`