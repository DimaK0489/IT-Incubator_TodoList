import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";

type TodoListProps = {
    value: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
}
type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export function TodoList(props: TodoListProps) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
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

    return (
        <div>
            <h3>{props.value}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}

                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onRemoveHandler = () => {
                        props.removeTask(t.id)
                    }
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveHandler}>Delete</button>
                    </li>
                })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}