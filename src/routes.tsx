import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import App from "./App";
import WebcamCapture from "./components/camera";
import Test from "./components/test";
import OCR from "./components/ocr";
// import OCRSpace from "./components/ocrspace";

const routes = (
    <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/test' component={Test} />
        <Route exact path='/WebcamCapture' component={WebcamCapture} />
        <Route exact path='/ocr' component={OCR} />
        {/*<Route exact path='/ocr' component={OCRSpace} />*/}
        <Redirect to="/" />
    </Switch>
);

export default routes;