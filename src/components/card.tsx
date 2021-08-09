import React from 'react';
import {CardItem} from "../types";
import {
    Button,
    Checkbox, createStyles,
    FormControl,
    FormControlLabel, FormGroup,
    Grid, makeStyles, Paper,
    Radio,
    RadioGroup,
    TextField, Theme
} from "@material-ui/core";
// import styled from 'styled-components';

interface CardProps {
    idx: number;
    item: CardItem;
    userNames: string[];
    submitAction: (idx: number, field: string, newValue: any) => void;
    deleteAction: (idx: number) => void;
}

const Card: React.FC<CardProps> = (props) => {
    const taxItems = {"税込":0, "8%": 8, "10%": 10};
    const userName = props.userNames;
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

    return (
        <div>
            <Paper className={classes.paper}>
                <Grid container direction="row" spacing={0} alignItems="center" justify="center">
                    <Grid item xs={2}>
                        <form className="hoge" noValidate autoComplete="off">
                            <TextField className={classes.textfield} id="value_input" label={'商品' + props.idx}
                                       value={props.item.value} onChange={handleValue}/>
                        </form>
                    </Grid>
                    <Grid item xs={9}>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="tax" name="tax" defaultValue={props.item.tax} onChange={handleTax}>
                                 {Object.entries(taxItems).map(([k, v]) => {
                                    return (
                                        <FormControlLabel
                                            value={v}
                                            control={<Radio className={classes.formbox} color="primary"/>}
                                            // label={k}
                                            label={<span className={classes.formlabel}>{k}</span>}
                                            labelPlacement="top"
                                            checked={props.item.tax === v}
                                            style={{marginLeft: '-0.3rem', marginRight: '0rem'}}
                                        />
                                    );
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormGroup row>
                                {userName.map((v, i) => {
                                    return (
                                        <FormControlLabel
                                            value={v}
                                            control={<Checkbox className={classes.formbox} checked={props.item.person[i]} onChange={(e) => handlePerson(e, i)}/>}
                                            // label={v}
                                            label={<span className={classes.formlabel}>{v}</span>}
                                            labelPlacement="top"
                                            style={{marginLeft: '-0rem', marginRight: '0rem'}}
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
        textfield: {
            width: '80px',
            marginLeft: '0.5rem',
        },
        formlabel: {
            fontSize: '0.5rem',
        },
        formbox: {
            marginTop: '-0.5rem',
        },
    }),
);

// const StyledTextField = styled(TextField)`
//     width: 80px;
// `