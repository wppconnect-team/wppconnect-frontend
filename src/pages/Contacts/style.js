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

export const HeaderComponent = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2em;
  height: 7%;
  border-bottom: 1px solid rgba(0, 0, 0, .1);

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  input {
    width: 300px;
    border: 1px solid #e2e6e8;
    padding: 10px 1em;
    border-radius: 5px;
    outline: 0;
  }

  button {
    background-color: #44ce4b;
    padding: 10px 1.5em;
    border: 0;
    margin-left: 1em;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    outline: 0;
  }
`;

export const TableContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .MuiDataGrid-root {
    border: 0;

    .MuiDataGrid-colCellWrapper {
      font-size: 1rem;
      background-color: #fafafa;
      text-transform: uppercase;
    }

    .MuiDataGrid-cell {
      font-size: 1rem;
    }
  }

  .MuiDataGrid-root .MuiDataGrid-row {
    width: auto;
  }

  .MuiDataGrid-renderingZone {
    width: 100% !important;
  }

  .MuiDataGrid-footer {
    p {
      font-size: 1.5rem;
    }

    button {
      svg {
        width: 25px;
        height: 25px;
      }
    }
  }
`;