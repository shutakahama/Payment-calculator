import React, {useEffect, useState} from 'react';
import './App.css';
import Card from "./components/Card";
import {CardItem} from "./types";
import {Button, Grid} from "@material-ui/core";
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'

const App = () => {
    const initialItem: CardItem = {name: '商品', value: 0, person: [true, true], tax: 8}
    const [cardItems, setCardItem] = useState<CardItem[]>([]);
    const [paymentItems, setPaymentItem] = useState<number[]>([0, 0]);
    const userNames: string[] = ["しゅうすけ", "ゆかり"]
    const history = useHistory();

    useEffect(() => {
        const appState = localStorage.getItem("cardItems")
        if (typeof appState === "string") setCardItem(JSON.parse(appState));
    }, []);

    const changeCard = (idx: number, field: string, newValue: any) => {
        let tmp = cardItems;
        if ((field === "name") && (typeof newValue === "string")) tmp[idx].name = newValue;
        if ((field === "value") && (typeof newValue === "number")) tmp[idx].value = newValue;
        if ((field === "person") && (typeof newValue === "object")) tmp[idx].person = newValue;
        if ((field === "tax") && (typeof newValue === "number")) tmp[idx].tax = newValue;
        setCardItem(tmp);
        localStorage.setItem("cardItems", JSON.stringify(tmp));
        calculatePayment()
    }

    const deleteCard = (idx: number) => {
        let tmp = cardItems;
        tmp.splice(idx, 1);

        // if (tmp.length === 0) {
        //     tmp.push(initialItem)
        // }
        setCardItem(tmp);
        localStorage.setItem("cardItems", JSON.stringify(tmp));
        calculatePayment()
    }

    const clearCard = () => {
        // const tmp: CardItem[] = [initialItem]
        // setCardItem(tmp);
        setCardItem([]);
        localStorage.setItem("cardItems", JSON.stringify([]));
        calculatePayment()
    }

    const createNewCard = () => {
        setCardItem([...cardItems, initialItem])
    }

    const calculatePayment = () => {
        let payment: number[] = [0, 0]
        for (let item of cardItems) {
            let value = item.value * (1 + 0.01*item.tax)
            let numPerson = 0
            for (let i = 0; i < item.person.length; i++){
                if (item.person[i]) numPerson += 1
            }
            if (numPerson === 0) continue
            for (let i = 0; i < item.person.length; i++) {
                if (item.person[i]) payment[i] += (value/numPerson)
            }
        }
        setPaymentItem(payment)
    }

    const RaiseCamera = () => {
        history.push("/WebcamCapture");
    }

    return (
        // <div className={utilStyles.container}>
        <Wrapper>
            <Title>
                レシート計算くん
            </Title>
            <Row>
                {cardItems.map((e, i) => {
                    return (
                        <Card
                            idx={i}
                            item={e}
                            userNames={userNames}
                            submitAction={(idx: number, field: string, newValue: any) => changeCard(idx, field, newValue)}
                            deleteAction={(idx: number) => deleteCard(idx)}
                        />
                    );
                })}
            </Row>
            <Row>
                <Button id="submit" variant="contained" color="primary" onClick={() => createNewCard()}>
                    +
                </Button>
            </Row>
            <Row>
                <Button id="clear" variant="contained" color="primary" onClick={() => clearCard()}>
                    全てクリアする
                </Button>
            </Row>
            <Row>
                <Button id="submit" variant="contained" color="primary" onClick={() => RaiseCamera()}>
                    カメラから読み込み
                </Button>
            </Row>
            <Row>
                <p>{userNames[0]}: {Math.round(paymentItems[0])} 円</p>
                <p>{userNames[1]}: {Math.round(paymentItems[1])} 円</p>
            </Row>
        </Wrapper>
    );
}

export default App;

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

