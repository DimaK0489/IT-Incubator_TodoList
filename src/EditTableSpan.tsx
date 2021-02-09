import React, {useState} from "react";

type EditTablePropsType = {
    title: string
}
export function EditTableSpan(props: EditTablePropsType) {
    const [editMode, setEditNode] = useState<boolean>(false)

    const onEditMode = () => {
        setEditNode(true)
    }
    const offEditMode = () => {
        setEditNode(false)
    }
    return (
            editMode
            ? <input
                    value={props.title}
                    autoFocus
                    onBlur={offEditMode}
                />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
}