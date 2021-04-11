import React from "react";
import {Route, Router, Switch} from "react-router-dom";
import history from "../history";
import SendMessagePage from "../pages/ChatPage";
import ScanNewSession from "../pages/NewSessionPage";
import ContactsPage from "../pages/Contacts";
import Sidebar from "../components/Sidebar";

const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={ScanNewSession}/>
                <Route path="/nova-sessao" component={ScanNewSession}/>

                <div style={{display: "flex", width: "100%"}}>
                    <Sidebar/>
                    <Route path="/chat" component={SendMessagePage}/>
                    <Route path="/contatos" component={ContactsPage}/>
                </div>
            </Switch>
        </Router>
    );
};

export default Routes;