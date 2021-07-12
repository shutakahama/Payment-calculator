import React, {useEffect, useState} from 'react';
import { createWorker } from 'tesseract.js';
import {useLocation, useHistory} from "react-router-dom";
import styled from "styled-components";
import {Button} from "@material-ui/core";

interface LocationState {
    image: string;
}

const OCRSpace: React.FC = () => {
    // const ocrSpace = require('ocr-space-api-wrapper')
    const axios = require('axios')
    const location = useLocation<LocationState>()
    const history = useHistory();
    const [textOcr, setTextOcr] = useState<string>('');
    const [resOCR, setResOcr] = useState<string[]>(['読み取り中...']);

    useEffect(() => {
        const tryOcr = async () => {
            const data = new FormData()
            data.append('base64Image', location.state.image)
            data.append('language', 'jpn')
            const request = {
                method: 'POST',
                url: String('https://api.ocr.space/parse/image'),
                headers: {apikey: String('c377eaec3788957')},
                data,
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
            const response = await axios(request)
            console.log(response.data)
            const resString = response.data.ParsedResults[0].ParsedText
            setTextOcr(resString);
            translateOCR();
        }
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
        tryOcr();
    }, [axios, location.state.image, textOcr]);


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

export default OCRSpace;

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


// let imageBuffer = Buffer.from(location.state.image, "base64");
// console.log(typeof location.state.image)
// const res = await ocrSpace(location.state.image, { apiKey: 'c377eaec3788957' })
// console.log(res)
// const data = new FormData()
// data.append('apikey', 'c377eaec3788957')
// data.append('base64Image', location.state.image)
// fetch('https://api.ocr.space/parse/image', {
//     method: 'POST',
//     // headers: {'Content-Type': 'application/form'},
//     // body: JSON.stringify({
//     //     apikey: 'c377eaec3788957',
//     //     base64Image: location.state.image,
//     // }),
//     body: data
// }).then(res => res.json())
//     .then(data => {
//         console.log(data)
//     })
