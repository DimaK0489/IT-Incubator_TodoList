import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditTableSpan} from "../../../components/EditableSpan/EditTableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {changeTodolistTitleTC, FilterValueType, TodolistDomainType} from "./todoLists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./tasks-reducer";
import {TaskType, TaskStatuses} from "../../../api/Types";

export type TodoListProps = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: FilterValueType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeStatus: (taskID: string, status: TaskStatuses, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
    changeTodoListTitle: (title: string, todolistID: string) => void
    //entityStatus: RequestStatusType
    demo?: boolean
}

export const TodoList = React.memo(({demo = false, ...props}: TodoListProps) => {

    const dispatch = useDispatch()
    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const addTodolist = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleTC({todolistId: props.todolist.id, title: title}))
    }, [props.todolist.id])

    const onAllClickHandler = () => {
        props.changeFilter("all", props.todolist.id)
    }

    const onActiveClickHandler = () => {
        props.changeFilter("active", props.todolist.id)
    }

    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.todolist.id)
    }

    const removeTask = useCallback(() => {
        props.removeTodolist(props.todolist.id)
    }, [])

    let taskForTodolist = props.tasks
    if (props.todolist.filter === "active") {
        taskForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        taskForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)

    }
    const tasks = taskForTodolist.map(t => {
        return <Task task={t}
                     key={t.id}
                     removeTask={props.removeTask}
                     changeTaskTitle={props.changeTaskTitle}
                     changeStatus={props.changeStatus}
                     todolistId={props.todolist.id}/>
    })

    return (
        <div>
            <h3><EditTableSpan title={props.todolist.title} changeItem={changeTodoListTitle}/>
                <IconButton onClick={removeTask} disabled={props.todolist.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTodolist} disabled={props.todolist.entityStatus === "loading"}/>
            <ul style={{listStyle: "none", paddingLeft: "0"}}>{tasks}</ul>
            <div>
                <Button
                    size={"small"}
                    color={props.todolist.filter === "all" ? "secondary" : "primary"}
                    variant={"contained"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    size={"small"}
                    color={props.todolist.filter === "active" ? "secondary" : "primary"}
                    variant={"contained"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    size={"small"}
                    color={props.todolist.filter === "completed" ? "secondary" : "primary"}
                    variant={"contained"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
});