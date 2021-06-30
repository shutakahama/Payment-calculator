import React, {useState} from 'react';
import './App.css';
import Card from "./components/Card";
import {CardItem} from "./types";
import {Button, Grid} from "@material-ui/core";
import utilStyles from "./style/utils.module.css"

const App = () => {
    const initialItem: CardItem = {name: '商品', value: 0, person: [true, true], tax: 8}
    const [cardItems, setCardItem] = useState<CardItem[]>([]);
    const [paymentItems, setPaymentItem] = useState<number[]>([0, 0]);
    const userName: string[] = ["しゅうすけ", "ゆかり"]

    const changeCard = (idx: number, field: string, newValue: any) => {
        let tmp = cardItems;
        if (field === "name") tmp[idx].name = newValue;
        if (field === "value") tmp[idx].value = newValue;
        if (field === "person") tmp[idx].person = newValue;
        if (field === "tax") tmp[idx].tax = newValue;
        setCardItem(tmp);
        calculatePayment()
    }

    const deleteCard = (idx: number) => {
        let tmp = cardItems;
        tmp.splice(idx, 1);

        // if (tmp.length === 0) {
        //     tmp.push(initialItem)
        // }
        setCardItem(tmp);
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

    return (
        <div className={utilStyles.container}>
            <section className={utilStyles.headingLg} >
                レシート計算くん
            </section>
            <div>
                {cardItems.map((e, i) => {
                    return (
                        <Card
                            idx={i}
                            item={e}
                            submitAction={(idx: number, field: string, newValue: any) => changeCard(idx, field, newValue)}
                            deleteAction={(idx: number) => deleteCard(idx)}
                        />
                    );
                })}
            </div>
            <Button id="submit" variant="contained" color="primary" onClick={() => createNewCard()}>
                +
            </Button>
            <br/>
            <br/>
            <Button id="submit" variant="contained" color="primary" onClick={() => alert("commig soon")}>
                カメラから読み込み
            </Button>
            <div>
                <p>{userName[0]}: {Math.round(paymentItems[0])} 円</p>
                <p>{userName[1]}: {Math.round(paymentItems[1])} 円</p>
            </div>
        </div>
    );
}

export default App;
