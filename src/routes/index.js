import React from 'react'
import {Route, Router, Switch} from "react-router-dom";
import history from "../history";
import StartSessionPage from "../pages/StartSession";
import SendMessagePage from "../pages/SendMessage";

const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={StartSessionPage}/>
                <Route path="/send-message" component={SendMessagePage}/>
            </Switch>
        </Router>
    )
}

export default Routes;