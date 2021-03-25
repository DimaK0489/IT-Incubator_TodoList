import React, {useCallback, useReducer, useState} from 'react';
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

const AppWithRedux = () => {

    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((id: string, todolistID: string) => {
        let action = removeTaskAC(id,todolistID)
        dispatch(action)
    }, [dispatch])
    const addTask = useCallback((title: string, todolistID: string) => {
        dispatch(addTaskAC(title,todolistID))
    }, [dispatch])
    const changeStatus = useCallback((taskID: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todolistID))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskID: string, title: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todolistID))
    }, [dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        let action = removeTodolistAC(todolistID)
        dispatch(action)
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValueType, todolistID: string) => {
        dispatch(changeTodolistFilterAC(value, todolistID))
    }, [dispatch])
    const changeTodoListTitle = useCallback((title: string, todolistID: string) => {
        dispatch(changeTodolistTitleAC(title, todolistID))}, [dispatch])
    const addTodoList = useCallback((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const listToDo = todoLists.map(t => {
        let taskForTodolist = tasks[t.id]
        return (
            <Grid item key={t.id} >
                <Paper elevation={10} style={{padding: "20px"}}>
                    <TodoList
                    id={t.id}
                    key={t.id}
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
