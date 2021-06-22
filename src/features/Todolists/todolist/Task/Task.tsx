import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditTableSpan} from "../../../../components/EditableSpan/EditTableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/Types";


export type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeStatus: (taskID: string, status: TaskStatuses, todolistID: string) => void
    removeTask: (id: string, todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
}
export type  TasksStateType = {
    [key: string]: Array<TaskType>
}

export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newStatusValue = e.currentTarget.checked
        props.changeStatus(props.task.id, newStatusValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }
    const changeTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox
                color={"secondary"}
                checked={props.task.status === TaskStatuses.Completed}
                onChange={onChangeHandler}
            />
            <EditTableSpan title={props.task.title} changeItem={changeTitle}/>
            <IconButton onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})