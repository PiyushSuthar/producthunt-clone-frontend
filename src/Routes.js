import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import App from './App';
import HomePage from './Core/HomePage';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={ HomePage } />
            </Switch>
        </Router>
    )
}
