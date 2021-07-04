import React, {useEffect, useState} from 'react';
import { createWorker } from 'tesseract.js';
import {useLocation, useHistory} from "react-router-dom";
import styled from "styled-components";
import {Button} from "@material-ui/core";

interface LocationState {
    image: string;
}

const OCR: React.FC = () => {
    const location = useLocation<LocationState>()
    const history = useHistory();
    const [textOcr, setTextOcr] = useState<string>('');
    const [resOCR, setResOcr] = useState<string[]>(['読み取り中...']);
    const worker = createWorker()

    const tryOcr = async() => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        let imageBuffer = Buffer.from(location.state.image, "base64");
        const { data: { text } } = await worker.recognize(imageBuffer);
        setTextOcr(text);
        console.log(text)
        await worker.terminate();
        translateOCR()
    }

    tryOcr()

    const translateOCR = () => {
        const tmp = textOcr.split(/\n|\s/);
        console.log(tmp)
        const res: string[] = []
        for (let e of tmp) {
            if (!isNaN(Number(e))) {
                if (Number(e) < 10) continue
                if (Number(e) > 10000) continue
                res.push(e);
            } else if (!isNaN(Number(e.slice(1)))) {
                if (Number(e.slice(1)) < 10) continue
                if (Number(e.slice(1)) > 10000) continue
                res.push(e.slice(1));
            }
        }
        if (res.length === 0) res.push('何も読み取れませんでした')
        setResOcr(res);
    }

    const addValues = () => {
        const appState = localStorage.getItem("cardItems")
        const tmp = typeof appState === "string" ? JSON.parse(appState) : []
        for (let itm of resOCR) {
            tmp.push({name: '商品', value: Number(itm), person: [true, true], tax: 8})
        }
        localStorage.setItem("cardItems", JSON.stringify(tmp));
        history.push("/");
    }

    const removeValues = () => {
        history.push("/WebcamCapture");
    }

    return (
        <Wrapper>
            <Title>
                読み取られた金額
            </Title>
            <Row>
                {resOCR.map((v, i) => {
                    return (
                        <p>{v}</p>
                    )
                })}
            </Row>
            <Row>
                <Button id="add" variant="contained" color="primary" onClick={() => addValues()}>
                    追加する
                </Button>
            </Row>
            <Row>
                <Button id="remove" variant="contained" color="primary" onClick={() => removeValues()}>
                    撮り直す
                </Button>
            </Row>
        </Wrapper>
    );
}

export default OCR;

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
