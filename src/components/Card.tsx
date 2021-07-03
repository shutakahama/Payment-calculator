// @ts-ignore
import React from 'react';
import {CardItem} from "../types";
import {
    Button,
    Checkbox, createStyles,
    FormControl,
    FormControlLabel, FormGroup,
    FormLabel, Grid, makeStyles, Paper,
    Radio,
    RadioGroup,
    TextField, Theme
} from "@material-ui/core";
// import utilStyles from "../style/utils.module.css"
import styled from 'styled-components';

interface CardProps {
    idx: number;
    item: CardItem;
    submitAction: (idx: number, field: string, newValue: any) => void;
    deleteAction: (idx: number) => void;
}

const Card: React.FC<CardProps> = (props) => {
    const taxItems = {"税込":0, "8%": 8, "10%": 10}
    const userName = ["しゅうすけ", "ゆかり"]
    const classes = useStyles();

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
        if (!isNaN(Number(e.target.value))) {
            props.submitAction(props.idx, "value", Number(e.target.value))
        }
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.deleteAction(props.idx)
    }
    // alert([props.idx, props.item.value])

    return (
        <div>
            <Paper className={classes.paper}>
                <Grid container direction="row" spacing={0} alignItems="center" justify="center">
                    <Grid item xs={3}>
                        <form className="hoge" noValidate autoComplete="off">
                            {/*<TextField className={utilStyles.textInput} required id="name_input" label="品目"*/}
                            {/*           value={props.item.name} onChange={handleName}/>*/}
                            <StyledTextField id="value_input" label={'商品' + props.idx}
                                       value={props.item.value} onChange={handleValue}/>
                        </form>
                    </Grid>
                    <Grid item xs={8}>
                        <FormControl component="fieldset">
                            <StyledRadioGroup row aria-label="tax" name="tax" defaultValue={props.item.tax} onChange={handleTax}>
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
                            </StyledRadioGroup>
                        </FormControl>
                    {/*</Grid>*/}
                    {/*<Grid item xs={3}>*/}
                        <FormControl>
                            <FormGroup row>
                                {userName.map((v, i) => {
                                    return (
                                        <StyledFormControlLabel
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
                    <Grid item xs={1} alignItems="center" justify="center">
                        <Button id="submit" variant="contained" color='primary' style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} onClick={(e) => handleDelete(e)}>
                            ×
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default Card;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            // height: 140,
            // width: 100,
            margin: 10,
            padding: 10,
            background: 'whitesmoke',
        },
        control: {
            padding: theme.spacing(2),
        },
    }),
);

const StyledTextField = styled(TextField)`
    width: 100px;
`

const StyledRadioGroup = styled(RadioGroup)`
    font-size: 1rem;
`

const StyledFormControlLabel = styled(FormControlLabel)`
    margin: 0rem 0;
    label: {
        font-size: 1rem;
    }
`
