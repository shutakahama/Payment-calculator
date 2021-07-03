import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import App from "./App";
import WebcamCapture from "./components/camera";
import Test from "./components/test";

const routes = (
    <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/test' component={Test} />
        <Route exact path='/WebcamCapture' component={WebcamCapture} />
        <Redirect to="/" />
    </Switch>
);

export default routes;