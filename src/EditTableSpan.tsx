import React, {ChangeEvent, useState} from "react";

type EditTablePropsType = {
    title: string
    changeItem: (newTaskTitle: string) => void
}
export function EditTableSpan(props: EditTablePropsType) {
    const [editMode, setEditNode] = useState<boolean>(false)
    const [newTaskTitle, setNewTaskTitle] = useState<string>(props.title)

    const onEditMode = () => {
        setEditNode(true)
    }
    const offEditMode = () => {
        setEditNode(false)
        props.changeItem(newTaskTitle)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    return (
            editMode
            ? <input
                    value={newTaskTitle}
                    autoFocus
                    onBlur={offEditMode}
                    onChange={onChangeHandler}
                />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
}