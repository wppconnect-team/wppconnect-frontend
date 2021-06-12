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
  width: 80%;
  height: 100vh;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const LeftContainer = styled.div`
  width: 25%;
  display: flex;
  background: #fff;
  height: 100%;
  min-width: 300px;
  border-right: 1px solid #E8E8EF;

  ul {
    list-style-type: none;
    width: 100%;

    li {
      display: flex;
      flex-direction: column;

      .wrapper-li {
        display: flex;
        width: 100%;
        padding: 1.5em;
        cursor: pointer;
        transition-duration: 200ms;

        :hover {
          box-shadow: 0px 4px 30px rgb(22 33 74 / 8%);
          border-radius: 5px;
          background-color: #FFF;
        }

        .wrapper-ic {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background-color: #F1F4FC;
          border-radius: 5px;
          text-align: center;
          white-space: nowrap;

          svg {
            color: #808292;
            height: 22px;
            width: 22px;
          }
        }

        .wrapper-text {
          display: inline-block;
          width: 220px;
          vertical-align: top;
          margin-left: 12px;
          pointer-events: none;

          h2 {
            margin: 0px !important;
            padding: 0px !important;
            font-weight: 600;
            font-size: 16px;
            color: #393C44;
          }

          p {
            color: #808292;
            font-size: 1rem;
            line-height: 21px;
          }
        }
      }
    }
  }
`;
export const RightContainer = styled.div`
  width: 75%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;