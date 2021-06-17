import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {addTodolistTC,changeTodolistFilterAC,changeTodolistTitleTC,fetchTodolistsTC,FilterValueType,removeTodolistTC,
    TodolistDomainType
} from "./todolist/todoLists-reducer";
import {addTaskTC,  updateTaskTC, removeTasksTC} from "./todolist/tasks-reducer";
import {TaskStatuses} from "../../api/todolists-a-p-i";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./todolist/Todolist";
import {TasksStateType} from "./todolist/Task/Task";
import {Redirect} from "react-router-dom";

type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo = false}) => {
    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        const action = removeTasksTC({taskId, todolistId})
        dispatch(action)
    }, [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC({title, todolistId}))
    }, [dispatch])
    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC({taskId: taskId, model: {status}, todolistId: todolistId}))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
        dispatch(updateTaskTC({taskId: taskId, model: {title: title}, todolistId: todolistId}))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistTC(todolistId)
        dispatch(action)
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValueType, todolistID: string) => {
        dispatch(changeTodolistFilterAC({filter: value, todolistId: todolistID}))
    }, [dispatch])
    const changeTodoListTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC({todolistId, title}))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
    
    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    } 
    return <>
        <Grid container style={{padding: "7px 0"}}> <AddItemForm addItem={addTodoList}/></Grid>
        <Grid container spacing={10}>{
            todoLists.map(t => {
                let taskForTodolist = tasks[t.id]
                return (
                    <Grid item key={t.id}>
                        <Paper elevation={10} style={{padding: "20px"}}>
                            <TodoList
                                key={t.id}
                                todolist={t}
                                //entityStatus={t.entityStatus}
                                tasks={taskForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodoListTitle={changeTodoListTitle}
                                demo={demo}
                            /></Paper>
                    </Grid>
                )
            })}</Grid>
    </>
}