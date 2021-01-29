import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";


type TodoListProps = {
    value: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeStatus: (taskID: string, isDone: boolean) => void
    filter: FilterValueType
}
type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export function TodoList(props: TodoListProps) {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") addTask();
    }
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }
    const tasks = props.tasks.map(t => {
        const onRemoveHandler = () => {
            props.removeTask(t.id)
        }
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked)
        }
        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input type="checkbox"
                   checked={t.isDone}
                   onChange={onChangeHandler}
            />
            <span>{t.title}</span>
            <button onClick={onRemoveHandler}>Delete</button>
        </li>
    })
    return (
        <div>
            <h3>{props.value}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}

                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>

            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}