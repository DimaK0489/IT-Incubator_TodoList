import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditTableSpan} from "./EditTableSpan";
import {Delete} from "@material-ui/icons";
import {TasksType} from "./Todolist";

export type TaskPropsType = {
    task: TasksType
    todolistId: string
    changeStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    removeTask: (id: string, todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }
    const changeTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])
    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                color={"secondary"}
                checked={props.task.isDone}
                onChange={onChangeHandler}
            />
            <EditTableSpan title={props.task.title} changeItem={changeTitle}/>
            <IconButton onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})