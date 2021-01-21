import React from "react";
import {FilterValueType} from "./App";

type TodoListProps = {
    value: string
    tasks: Array<TasksType>
    deleteTask: (id:string) => void
    changeFilter: (value:FilterValueType) => void

}
type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export function TodoList(props: TodoListProps) {
    return (
        <div>
            <h3>{props.value}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t =>
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ () => {props.deleteTask(t.id)} }>Delete</button>
                    </li>)}
            </ul>
            <div>
                <button onClick={ () => {props.changeFilter("all")}}>All</button>
                <button onClick={ () => {props.changeFilter("active")}}>Active</button>
                <button onClick={ () => {props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    )
}