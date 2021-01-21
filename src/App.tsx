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
    function deleteTask(id:string){
        let filterTask = tasks.filter( t => t.id !== id)
        setTasks(filterTask);
    }

    let [filter, setFilter] = useState<FilterValueType>("all")
    let tasksForTodolist = tasks
    if(filter === "active"){
        tasksForTodolist = tasks.filter( t => t.isDone === false)
    }
    if(filter === "completed"){
        tasksForTodolist = tasks.filter( t => t.isDone === true)
    }
    function changeFilter(value: FilterValueType){
        setFilter(value)
    }

    function addTask(){
        let task = {id: v1(), title: "New Task", isDone: false}
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }

    return (
        <div className="App">
            <TodoList value={"What to Learn"}
                      tasks={tasksForTodolist}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}


export default App;
