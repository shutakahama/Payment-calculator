import React, {useRef, useState} from 'react'
import Webcam from 'react-webcam'
import styled from "styled-components";
import { Link, useHistory } from 'react-router-dom'
import {Button} from "@material-ui/core";

const WebcamCapture = ()=> {
    const history = useHistory();
    const webcamRef = useRef<Webcam>(null);
    const [facingMode, setFacingMode] = useState<string>("user");
    const videoConstraints= {
        width: 1280,
        height: 720,
        facingMode: facingMode
    };

    const Capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current?.getScreenshot();
            alert("レシートから追加しますか？")
            history.push("/");
        },
        [webcamRef]
    );

    const SwitchCamera = () => {
        if (facingMode === "user") setFacingMode("environment")
        else setFacingMode("user")
    }

    return (
        <Wrapper>
            <Title>
                レシートを読みこむ
            </Title>
            <Row>
                <Webcam
                    audio={false}
                    height={800}
                    width={800}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
            </Row>
            <Row>
                <Button id="switch" variant="contained" color="primary" onClick={() => SwitchCamera()}>
                    カメラ切り替え
                </Button>
            </Row>
            <Row>
                <Button id="submit" variant="contained" color="primary" onClick={() => Capture()}>
                    撮影する
                </Button>
            </Row>
        </Wrapper>
    );
};

export default WebcamCapture;

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.div`
  margin: 4rem 0;
`;

const Row = styled.div`
  text-align: center;
  margin: 1.2rem 0;
`;