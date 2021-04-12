import React from "react";
import {BrowserRouter} from "react-router-dom";
import GlobalStyle, {Container, Layout} from "./style/GlobalStyle";
import Routes from "./routes";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Container>
                    <Routes/>
                </Container>
            </Layout>

            <GlobalStyle/>
        </BrowserRouter>
    );
}

export default App;