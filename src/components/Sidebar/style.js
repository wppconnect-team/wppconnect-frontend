/*
 * Copyright 2021 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import styled from "styled-components";

export const Layout = styled.div`
  height: 100vh;
  width: 100%;
  border-right: 1px solid rgba(0, 0, 0, .1);
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const BottomItems = styled.footer`
  display: flex;
  flex-direction: column;
`;

export const MenuItems = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1em;
  list-style-type: none;

  .selected {
    background: #f4f6fb;
    color: #47a7f6;
    font-weight: 600;
  }

  li {
    display: flex;
    align-items: center;
    //padding: 10px;
    margin-bottom: 1em;
    width: 100%;
    transition-duration: 200ms;
    border-radius: .4rem;

    :hover {
      background: #f4f6fb;

      * {
        color: #47a7f6
      }
    }

    .disabled {
      cursor: not-allowed;
      color: #999;

      :hover {
        background: #fff;

        * {
          color: #999;
        }
      }
    }
  }

  a {
    padding: 7px;
    display: flex;
    align-items: center;
    border-radius: .4rem;
    color: #6e6f73;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    width: 100%;

    svg {
      margin-right: .5em;
    }
  }
`;

export const ChangeSession = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 1em;
  border-top: 1px solid rgba(0, 0, 0, .1);
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  font-size: 1rem;

  .online-circle {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: aquamarine;
    margin-right: .5em;
  }

  div {
    display: flex;
    align-items: center;
  }

  a {
    color: #47a7f6;
    text-decoration: none;
  }
`;

export const InfoSession = styled.div`
  display: flex;
  align-items: center;
  padding: 1em 10px;
  font-size: 1rem;
  cursor: default;

  div {
    display: flex;
    flex-direction: column;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  a {
    font-size: 1rem;
    margin-top: 10px;
    color: #f64747;
  }
`;

export const LogoutButton = styled.p`
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  background: #f64747;
  text-align: center;
  padding: 10px;
  transition-duration: 200ms;

  :hover {
    background: red;
  }
`;