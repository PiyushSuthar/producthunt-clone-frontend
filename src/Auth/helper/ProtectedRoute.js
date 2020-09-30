import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '.';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return isAuthenticated() ? (
        <Route { ...rest } render={ props => <Component { ...rest } { ...props } /> } />
    ): (
        <Redirect to="/signin" />
    )
}

export default ProtectedRoute;
