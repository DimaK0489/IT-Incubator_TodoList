import React, {useState} from 'react';
import '../app/App.css';
import {TodoList} from "../features/Todolists/todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-a-p-i";
import {FilterValueType, TodolistDomainType} from "../features/Todolists/todolist/todoLists-reducer";

export type  TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const [todoLists, setTodoList] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ""}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML", status: TaskStatuses.Completed, todoListId: todolistId1, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "CSS", status: TaskStatuses.Completed, todoListId: todolistId1, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "JS",status: TaskStatuses.New, todoListId: todolistId1, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: todolistId2, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "Beef", status: TaskStatuses.New, todoListId: todolistId2, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "Meet", status: TaskStatuses.Completed, todoListId: todolistId2, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "Bred", status: TaskStatuses.New, todoListId: todolistId2, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low}
        ]
    })

    function removeTask(id: string, todolistID: string) {
        const todolistTasks = tasks[todolistID]
        tasks[todolistID] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks});
    }
    function addTask(title: string, todolistID: string) {
        const newTask = {id: v1(), title: title,  status: TaskStatuses.New, todoListId: todolistID, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low}
        const todolistTasks = tasks[todolistID]
        tasks[todolistID] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }
    function changeStatus(taskID: string, status: TaskStatuses, todolistID: string) {
        const todoListTasks = tasks[todolistID]
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.status = status
            setTasks({...tasks})
        }
    }
    function changeTaskTitle(taskID: string, title: string, todolistID: string) {
        const todoListTasks = tasks[todolistID]
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function removeTodolist(todolistID: string) {
        setTodoList(todoLists.filter(t => t.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
    }
    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodolistDomainType = {
            id: newTodoListID, title: title, filter: "all", addedDate: "", order: 0
        }
        setTodoList([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListID]: []})
    }
    function changeFilter(value: FilterValueType, todolistID: string) {
        const todolist = todoLists.find(t => t.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodoList([...todoLists])
        }

    }
    function changeTodoListTitle(title: string, todolistID: string) {
        const todoList = todoLists.find(tl => tl.id === todolistID)
        if (todoList) {
            todoList.title = title
            setTodoList([...todoLists])
        }
    }

    const listToDo = todoLists.map(t => {
        let taskForTodolist = tasks[t.id]
        if (t.filter === "active") {
            taskForTodolist = tasks[t.id].filter(t => t.status === TaskStatuses.New)
        }
        if (t.filter === "completed") {
            taskForTodolist = tasks[t.id].filter(t => t.status === TaskStatuses.Completed)
        }
        return (
            <Grid item key={t.id} >
                <Paper elevation={10} style={{padding: "20px"}}><TodoList
                    id={t.id}
                    value={t.title}
                    filter={t.filter}
                    tasks={taskForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                /></Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "7px 0"}}> <AddItemForm addItem={addTodoList}/></Grid>
                <Grid container spacing={10}>{listToDo}</Grid>
            </Container>
        </div>
    );
}


export default App;
