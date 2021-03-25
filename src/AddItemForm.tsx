import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) =>  {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) setError(null)
        if (e.key === "Enter") addItem();
    }
    const addItem = () => {
        let trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle !== "") {
            props.addItem(trimmedTitle);
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
                label={"Title"}
                error={!!error}
            />
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    );
});