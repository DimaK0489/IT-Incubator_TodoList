import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem();
    }
    const addItem = () => {
        let trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle !== "") {
            props.addItem(trimmedTitle);
            setNewTaskTitle("")
        } else {
            setError(true);
        }
    }
    return(
        <div>
            <TextField
                variant={"outlined"}
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                onBlur={() => setError(false)}
                helperText={error ? "Title is required" : ""}
                label={"Title"}
                error={error}
            />

            <IconButton>
                <AddBox/>
            </IconButton>
            {/*{error && <div className={"error-message"}>Title is required</div>}*/}
        </div>
    );

}