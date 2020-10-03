import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// AUTH And HOMEPAGE
import SignUp from './User/SignUp';
import HomePage from './Core/HomePage';
import Signin from './User/Signin';
import ProtectedRoute from './Auth/helper/ProtectedRoute'
// User Routes
import UserPage from './User/UserPage/UserPage';
import UserDashboard from './User/UserDash';
// Products Routes
import CreateProduct from './Core/Product/CreateProduct';
import SingleProduct from './Core/Product/singleProduct';
// Base Template
import Base from './Core/Base';
// Error Page
import ErrorPage from './Components/Error-SucessDialog/ErrorPage';

export default function Routes() {
    return (
        <Router>
            <Switch>
                {/* Main Routes AKA Auth and Homepage */ }
                <Route exact path="/" component={ HomePage } />
                <Route path="/signup" component={ SignUp } />
                <Route path="/signin" component={ Signin } />

                {/* User Routes */ }
                <Route path="/user/:username" component={ UserPage } />
                <ProtectedRoute path="/dashboard/user" component={ UserDashboard } />

                {/* Products Routes */ }
                <ProtectedRoute path="/create/product" component={ CreateProduct } />
                <Route path="/product/:productId" component={ SingleProduct } />

                {/* 404 Route */ }
                <Route>
                    <Base>
                        <ErrorPage />
                    </Base>
                </Route>
            </Switch>
        </Router>
    )
}
