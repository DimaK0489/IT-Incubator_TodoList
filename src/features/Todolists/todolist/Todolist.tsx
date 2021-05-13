import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditTableSpan} from "../../../components/EditableSpan/EditTableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {FilterValueType} from "./todoLists-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolists-a-p-i";
import {useDispatch} from "react-redux";
import { fetchTasksTC } from "./tasks-reducer";
import {RequestStatusType} from "../../../app/app-reducer";

export type TodoListProps = {
    id: string
    value: string
    tasks: Array<TaskType>
    filter?: FilterValueType
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: FilterValueType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeStatus: (taskID: string, status: TaskStatuses, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
    changeTodoListTitle: (title: string, todolistID: string) => void
    entityStatus: RequestStatusType
}

export const TodoList = React.memo((props: TodoListProps) =>  {
    const dispatch = useDispatch()
    useEffect( () => {
        dispatch(fetchTasksTC(props.id))
    },[])

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
        taskForTodolist =  props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        taskForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
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
                <IconButton onClick = {removeTask} disabled={props.entityStatus === "loading"}>
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