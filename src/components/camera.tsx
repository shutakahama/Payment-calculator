import React, {useRef, useState} from 'react'
import Webcam from 'react-webcam'
import styled from "styled-components";
import { useHistory } from 'react-router-dom'
import {Button} from "@material-ui/core";

const WebcamCapture = ()=> {
    const history = useHistory();
    const webcamRef = useRef<Webcam>(null);
    const [facingMode, setFacingMode] = useState<string>("environment");
    const videoConstraints= {
        width: 600,
        height: 600,
        facingMode: facingMode
    };

    const Capture = React.useCallback(
        () => {
            let imageSrc: string | null | undefined = webcamRef.current?.getScreenshot();
            if (typeof imageSrc !== 'string') return
            imageSrc = imageSrc.replace('data:image/jpeg;base64,', '')
            history.push({pathname: "/ocr", state: {image: imageSrc}});
        },
        [webcamRef]
    );

    const SwitchCamera = () => {
        if (facingMode === "user") setFacingMode("environment")
        else setFacingMode("user")
    }

    const returnHome = () => {
        history.push("/");
    }

    return (
        <Wrapper>
            <Title>
                レシートを読みこむ
            </Title>
            <Row>
                <Webcam
                    audio={false}
                    height={300}
                    width={300}
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
            <Row>
                <Button id="submit" variant="contained" color="primary" onClick={() => returnHome()}>
                    戻る
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