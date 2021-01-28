import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "REACT", isDone: true},
        {id: v1(), title: "REDUX", isDone: false},
        {id: v1(), title: "REST API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
        {id: v1(), title: "ANGULAR", isDone: false},

    ])

    function removeTask(id: string) {
        let filterTask = tasks.filter(t => t.id !== id)
        setTasks(filterTask);
    }
    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false}
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }
    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }
    function changeStatus(taskID: string, isDone: boolean) {
        const task = tasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    let [filter, setFilter] = useState<FilterValueType>("all")
    let tasksForTodolist = tasks
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    return (
        <div className="App">
            <TodoList value={"What to Learn"}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}


export default App;
