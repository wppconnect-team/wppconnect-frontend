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
import {ToastContainer} from "react-toastify";
import {BrowserRouter} from "react-router-dom";
import GlobalStyle, {Container, Layout} from "./style/GlobalStyle";
import Routes from "./routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Container>
                    <Routes/>
                </Container>
            </Layout>

            <GlobalStyle/>
                <ToastContainer/>
        </BrowserRouter>
    );
}

export default App;