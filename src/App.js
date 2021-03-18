import {BrowserRouter} from "react-router-dom";
import GlobalStyle, {Container, Layout} from "./style/GlobalStyle";
import Header from "./components/Header";
import Routes from "./routes";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Container>
                    <Header/>
                    <Routes/>
                </Container>

            </Layout>

            <GlobalStyle/>
        </BrowserRouter>
    );
}

export default App;
