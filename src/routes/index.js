import React from 'react'
import {Route, Router, Switch} from "react-router-dom";
import history from "../history";
import SendMessagePage from "../pages/ChatPage";
import ScanNewSession from "../pages/NewSessionPage";

const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={ScanNewSession}/>
                <Route path="/nova-sessao" component={ScanNewSession}/>
                <Route path="/chat" component={SendMessagePage}/>
            </Switch>
        </Router>
    )
}

export default Routes;