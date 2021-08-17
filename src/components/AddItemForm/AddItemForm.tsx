import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) =>  {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) setError(null)
        if (e.key === "Enter") addItemHandler();
    }
    const addItemHandler = () => {
        let trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle !== "") {
            addItem(trimmedTitle);
            setNewTaskTitle("")
        } else {
            setError("Title is required");
        }
    }
    return(
        <div>
            <TextField
                variant={"outlined"}
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                helperText={error}
                label={"Enter the title"}
                error={!!error}
                disabled={disabled}
            />
            <IconButton color="primary" onClick={addItemHandler} disabled={disabled} style={{marginLeft: '5px'}}>
                <AddBox/>
            </IconButton>
        </div>
    );
});