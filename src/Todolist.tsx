import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";

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
export type TasksType =  {
    id: string
    title: string
    isDone: boolean
}

export function TodoList(props: TodoListProps) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const tasks = props.tasks.map(t => {
        const onRemoveHandler = () => {
            props.removeTask(t.id, props.id)
        }
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }
        const changeTitle = (title:string) => {
            props.changeTaskTitle(t.id, title, props.id)
        }
        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input type="checkbox"
                   checked={t.isDone}
                   onChange={onChangeHandler}
            />
            <EditTableSpan title={t.title}
                           changeItem={changeTitle}/>
            <button onClick={onRemoveHandler}>Delete</button>
        </li>
    })
    return (
        <div>
            <h3><EditTableSpan title={props.value} changeItem={changeTodoListTitle}/>
                <button onClick={() => {
                    props.removeTodolist(props.id)
                }}>Del
                </button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>{tasks}</ul>
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