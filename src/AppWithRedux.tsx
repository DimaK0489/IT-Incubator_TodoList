import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTaskAC,
    addTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTasksTC, updateTaskStatusTC
} from './state/tasks-reducer';
import {
    addTodolistAC, addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValueType,
    removeTodolistAC, removeTodolistTC,
    TodolistDomainType
} from './state/todo-lists-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType, todolistsAPI} from "./api/todolists-a-p-i";

export type  TasksStateType = {
    [key: string]: Array<TaskType>
}

const AppWithRedux = () => {

    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        const action = removeTasksTC(taskId,todolistId)
        dispatch(action)
    }, [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(title, todolistId))
    }, [dispatch])
    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskStatusTC(taskId, status, todolistId))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskID: string, title: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todolistID))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistTC(todolistId)
        dispatch(action)
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValueType, todolistID: string) => {
        dispatch(changeTodolistFilterAC(value, todolistID))
    }, [dispatch])
    const changeTodoListTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const listToDo = todoLists.map(t => {
        let taskForTodolist = tasks[t.id]
        return (
            <Grid item key={t.id}>
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
