import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
            <input value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
                   onBlur={() => setError(false)}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>Title is required</div>}
        </div>
    );

}