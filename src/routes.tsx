import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import App from "./components/app";
import WebcamCapture from "./components/camera";
import OCR from "./components/ocr";

const routes = (
    <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/WebcamCapture' component={WebcamCapture} />
        <Route exact path='/ocr' component={OCR} />
        <Redirect to="/" />
    </Switch>
);

export default routes;