import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type  TaskStateType = {
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
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beef", isDone: true},
            {id: v1(), title: "Meet", isDone: true},
            {id: v1(), title: "Bred", isDone: true},
            {id: v1(), title: "Vegetables", isDone: false},
            {id: v1(), title: "Ags", isDone: false},
            {id: v1(), title: "Water", isDone: false},
            {id: v1(), title: "Jus", isDone: false},
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
    function changeStatus(taskID: string, isDone: boolean, todolistID: string) {
        const todoListTasks = tasks[todolistID]
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
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
        const newTodoList: TodoListType = {
            id: newTodoListID, title: title, filter: "all"
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
            taskForTodolist = tasks[t.id].filter(t => t.isDone === false)
        }
        if (t.filter === "completed") {
            taskForTodolist = tasks[t.id].filter(t => t.isDone === true)
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
