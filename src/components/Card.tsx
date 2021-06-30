// @ts-ignore
import React from 'react';
import {CardItem} from "../types";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel, FormGroup,
    FormLabel, Grid,
    Radio,
    RadioGroup,
    TextField
} from "@material-ui/core";
import utilStyles from "../style/utils.module.css"

interface CardProps {
    idx: number;
    item: CardItem;
    submitAction: (idx: number, field: string, newValue: any) => void;
    deleteAction: (idx: number) => void;
}

const Card: React.FC<CardProps> = (props) => {
    const taxItems = {"税込":0, "8%": 8, "10%": 10}
    const userName = ["しゅうすけ", "ゆかり"]

    const handlePerson = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        let tmp = props.item.person
        tmp[i] = e.target.checked
        props.submitAction(props.idx, "person", tmp)
    }

    const handleTax = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.submitAction(props.idx, "tax", Number(e.target.value))
    }

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.submitAction(props.idx, "name", e.target.value)
    }

    const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.submitAction(props.idx, "value", Number(e.target.value))
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.deleteAction(props.idx)
    }
    // alert([props.idx, props.item.value])

    return (
        <div>
            <Grid container direction="row" spacing={0}>
                <Grid item xs={4}>
                    <form className="hoge" noValidate autoComplete="off">
                        <TextField className={utilStyles.textInput} required id="name_input" label="品目"
                                   value={props.item.name} onChange={handleName}/>
                        <TextField className={utilStyles.textInput} required id="value_input" label="値段"
                                   value={props.item.value} onChange={handleValue}/>
                    </form>
                </Grid>
                <Grid item xs={3}>
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="tax" name="tax" defaultValue={props.item.tax} onChange={handleTax}>
                             {Object.entries(taxItems).map(([k, v]) => {
                             // {["0", "8", "10"].map(k => {
                                return (
                                    <FormControlLabel
                                        value={v}
                                        control={<Radio color="primary"/>}
                                        label={k}
                                        labelPlacement="top"
                                        checked={props.item.tax === v}
                                        style={{marginLeft: '5px', marginRight: '5px'}}
                                    />
                                );
                            })}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl>
                        <FormGroup row>
                            {userName.map((v, i) => {
                                return (
                                    <FormControlLabel
                                        value={v}
                                        control={<Checkbox checked={props.item.person[i]} onChange={(e) => handlePerson(e, i)}/>}
                                        label={v}
                                        labelPlacement="top"
                                        style={{marginLeft: '5px', marginRight: '5px'}}
                                    />
                                );
                            })}
                        </FormGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Button id="submit" variant="contained" color="primary" onClick={(e) => handleDelete(e)}>
                        削除
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Card;
