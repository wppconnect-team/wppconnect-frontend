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