import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./Todolist";
import {v1} from "uuid";

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
type  TaskStateType = {
    [todoList: string]: Array<TasksType>
}
export type FilterValueType = "all" | "active" | "completed"

function App() {
    const todolistID1 = v1()
    const todolistID2 = v1()
    const [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "REACT", isDone: true},
            {id: v1(), title: "REDUX", isDone: false},
            {id: v1(), title: "REST API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
            {id: v1(), title: "ANGULAR", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "REACT", isDone: true},
            {id: v1(), title: "REDUX", isDone: false},
            {id: v1(), title: "REST API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
            {id: v1(), title: "ANGULAR", isDone: false},
        ]
    })

    function removeTask(id: string, todolistID: string) {
        const todolistTasks = tasks[todolistID]
        tasks[todolistID] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks});
    }

    function addTask(title: string, todolistID: string) {
        const newTask = {id: v1(), title: title, isDone: false}
        const todolistTasks = tasks[todolistID]
        tasks[todolistID] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValueType, todolistID: string) {
        const todolist = todoLists.find(t => t.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodoList([...todoLists])
        }

    }

    function changeStatus(taskID: string, isDone: boolean, todolistID: string) {
        const todoListTasks = tasks[todolistID]
        const task= todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    function removeTodolist(todolistID: string){
        setTodoList(todoLists.filter(t => t.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
    }

    return (

        <div className="App">
            {
                todoLists.map(t => {
                    let taskForTodolist = tasks[t.id]
                    if(t.filter === "active"){
                        taskForTodolist = tasks[t.id].filter(t=> t.isDone === false)
                    }
                    if(t.filter === "completed"){
                        taskForTodolist = tasks[t.id].filter(t=> t.isDone === true)
                    }

                    return (
                        <TodoList
                            key={t.id}
                            id={t.id}
                            value={t.title}
                            filter={t.filter}
                            tasks={taskForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            removeTodolist={removeTodolist}
                        />
                    )
                })
            }

        </div>
    );
}


export default App;
