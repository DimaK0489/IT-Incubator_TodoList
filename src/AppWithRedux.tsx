import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListsReducer
} from './state/todo-lists-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type  TasksStateType = {
    [key: string]: Array<TasksType>
}
export type FilterValueType = "all" | "active" | "completed"

function AppWithRedux() {
    const todolistId1 = v1()
    const todolistId2 = v1()
    /*const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer,[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ])*/

    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()

    /*const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "REACT", isDone: true},
            {id: v1(), title: "REDUX", isDone: false},
            {id: v1(), title: "REST API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
            {id: v1(), title: "ANGULAR", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beef", isDone: true},
            {id: v1(), title: "Meet", isDone: true},
            {id: v1(), title: "Bred", isDone: true},
            {id: v1(), title: "Vegetables", isDone: false},
            {id: v1(), title: "Ags", isDone: false},
            {id: v1(), title: "Water", isDone: false},
            {id: v1(), title: "Jus", isDone: false},
        ]
    })*/

    function removeTask(id: string, todolistID: string) {
        let action = removeTaskAC(id,todolistID)
        dispatch(action)
    }
    function addTask(title: string, todolistID: string) {
        dispatch(addTaskAC(title,todolistID))
    }
    function changeStatus(taskID: string, isDone: boolean, todolistID: string) {
        dispatch(changeTaskStatusAC(taskID, isDone, todolistID))
    }
    function changeTaskTitle(taskID: string, title: string, todolistID: string) {
        dispatch(changeTaskTitleAC(taskID, title, todolistID))
    }


    function removeTodolist(todolistID: string) {
        let action = removeTodolistAC(todolistID)
        dispatch(action)
    }
    function addTodoList(title: string) {
        let action = addTodolistAC(title)
        dispatch(action)
    }
    function changeFilter(value: FilterValueType, todolistID: string) {
        dispatch(changeTodolistFilterAC(value, todolistID))
    }
    function changeTodoListTitle(title: string, todolistID: string) {
        dispatch(changeTodolistTitleAC(title, todolistID))
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

export default AppWithRedux;
