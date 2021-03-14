import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useGlobalState from "./globalState";

const RouteAuthenticated = ({ component: Component, path }) => {
    const g = useGlobalState();
    if (!g.s.manage.isAuthenticated) {
        return <Redirect to="/sign" />;
    }

    return <Route component={Component} path={path} />;
};

export default RouteAuthenticated;
