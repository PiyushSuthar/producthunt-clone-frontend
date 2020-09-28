import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from './User/SignUp';
// import App from './App';
import HomePage from './Core/HomePage';
import Signin from './User/Signin';
import UserPage from './User/UserPage/UserPage';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={ HomePage } />
                <Route path="/signup" component={ SignUp } />
                <Route path="/signin" component={ Signin } />
                <Route path="/user/:username" component={ UserPage } />
            </Switch>
        </Router>
    )
}
