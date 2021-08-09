import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import React, {useState} from "react";
import styled from "styled-components";

interface NameProps {
    userNames: string[];
    submitAction: (newName: string[]) => void;
}

const NameWindow: React.FC<NameProps> = (props) => {
    const [nameChangeFlag, setNameChangeFlag] = useState<boolean>(false);

    const switchNameWindow = () => {
        setNameChangeFlag(!nameChangeFlag)
    }

    const changeName = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, idx: number) => {
        let tmp = props.userNames.slice();
        tmp[idx] = e.target.value;
        props.submitAction(tmp)
    }

    const changeUserNum = (e: React.ChangeEvent<{name?: string, value: unknown}>) => {
        let tmp = props.userNames.slice();
        let new_num = Number(e.target.value)
        console.log(tmp, new_num)
        if (new_num < tmp.length) {
            while (new_num < tmp.length) tmp.pop()
        }
        else if (new_num > tmp.length) {
            while (new_num > tmp.length) tmp.push("ユーザー" + (tmp.length+1))
        }
        props.submitAction(tmp)
    }

    if (nameChangeFlag) {
        return (
            <div>
                <RowRight>
                    <Button id="changeName" variant="contained" color="primary" onClick={() => switchNameWindow()}>
                        完了
                    </Button>
                </RowRight>
                <RowRight>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">人数</InputLabel>
                        <Select
                            labelId="select-user-num"
                            id="select-user-num"
                            value={props.userNames.length}
                            onChange={changeUserNum}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                        </Select>
                    </FormControl>
                </RowRight>
                <RowRight>
                    {props.userNames.map((v, i) => {
                        return (
                            <form className="Namefield" noValidate autoComplete="off">
                                <TextField id="value_input" label={'ユーザー' + (i+1)}
                                           value={v} onChange={(e) => changeName(e, i)}/>
                            </form>
                        );
                    })}
                </RowRight>
            </div>
        )
    }
    else {
        return (
            <div>
                <RowRight>
                    <Button id="changeName" variant="contained" color="primary" onClick={() => switchNameWindow()}>
                        名前を変更する
                    </Button>
                </RowRight>
            </div>
        )
    }
}

export default NameWindow;

const RowRight = styled.div`
  text-align: right;
  margin: 1.2rem 3rem;
`;