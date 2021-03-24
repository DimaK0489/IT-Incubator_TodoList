import React, {ChangeEvent, useCallback, useMemo} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TodoListProps = {
    id: string
    value: string
    tasks: Array<TasksType>
    filter: FilterValueType
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: FilterValueType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
    changeTodoListTitle: (title: string, todolistID: string) => void
}
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = React.memo((props: TodoListProps) =>  {
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const changeTodoListTitle = useCallback((title: string) =>
        props.changeTodoListTitle(title, props.id),[props.changeTodoListTitle, props.id])
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTask = useCallback(() => {
        props.removeTodolist(props.id)
    }, [])
    let taskForTodolist = props.tasks
    if (props.filter === "active") {
        taskForTodolist =  props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        taskForTodolist = props.tasks.filter(t => t.isDone === true)
    }
    const tasks = taskForTodolist.map(t => {
        return <Task task={t}
                     key={t.id}
                     removeTask={props.removeTask}
                     changeTaskTitle={props.changeTaskTitle}
                     changeStatus={props.changeStatus}
                     todolistId={props.id}/>
    })

    return (
        <div>
            <h3><EditTableSpan title={props.value} changeItem={changeTodoListTitle}/>
                <IconButton onClick = {removeTask}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", paddingLeft: "0"}}>{tasks}</ul>
            <div>
                <Button
                    size={"small"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    variant={"contained"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    size={"small"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    variant={"contained"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    size={"small"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    variant={"contained"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
});