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
    // const [textOcr, setTextOcr] = useState<string>('');
    const [resOCR, setResOcr] = useState<string[]>(['読み取り中...']);
    const worker = createWorker();


    useEffect(() => {
        const tryOcr = async () => {
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            let imageBuffer = Buffer.from(location.state.image, "base64");
            const {data: {text}} = await worker.recognize(imageBuffer);
            // setTextOcr(text);
            console.log(text)
            await worker.terminate();
            // translateOCR();
        // }
        // const translateOCR = () => {
            const tmp = text.split(/\n|\s/);
            console.log(tmp)
            const res: string[] = []
            for (let e of tmp) {
                e = e.replace(/[¥気\\,()]/g, '')
                let nume: number = 0
                if (!isNaN(Number(e))) {
                    nume = Number(e)
                } else if (!isNaN(Number(e.slice(1)))) {
                    nume = Number(e.slice(1))
                } else if (!isNaN(Number(e.slice(0, e.length - 1)))) {
                    nume = Number(e.slice(0, e.length - 1))
                }
                if (nume < 10) continue
                if (nume > 10000) continue
                res.push(String(nume));
            }
            if (res.length === 0) res.push('何も読み取れませんでした')
            setResOcr(res);
        }

        tryOcr();
    }, [])


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
  color: MidnightBlue;
`;

const Wrapper = styled.div`
  margin: 4rem 0;
`;

const Row = styled.div`
  text-align: center;
  margin: 1.2rem 0;
`;
