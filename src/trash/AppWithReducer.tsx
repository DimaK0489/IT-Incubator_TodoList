import React, {useCallback, useReducer, useState} from 'react';
import '../app/App.css';
import {TodoList} from "../features/Todolists/todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, updateTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from '../features/Todolists/todolist/tasks-reducer';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValueType,
    removeTodolistAC,
    todoListsReducer
} from '../features/Todolists/todolist/todoLists-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-a-p-i";


export type  TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer,[
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ""},
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
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
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low}
        ]
    })

    function removeTask(id: string, todolistID: string) {
        let action = removeTaskAC(id,todolistID)
        dispatchToTasks(action)
    }
    function addTask(title: string, todolistID: string) {
        dispatchToTasks(addTaskAC({
            todoListId: todolistID,
            title: title,
            status: TaskStatuses.New,
            addedDate: "",
            deadline: "",
            description: "",
            order: 0,
            priority: 0,
            startDate: "",
            id: "exists"
        }))
    }
    function changeStatus(taskID: string, status: TaskStatuses, todolistID: string) {
        dispatchToTasks(updateTaskStatusAC(taskID, status, todolistID))
    }
    function changeTaskTitle(taskID: string, title: string, todolistID: string) {
        dispatchToTasks(changeTaskTitleAC(taskID, title, todolistID))
    }


    function removeTodolist(todolistID: string) {
        let action = removeTodolistAC(todolistID)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    const addTodoList = useCallback((title: string) => {
        let action = addTodolistAC({
            id: v1(),
            addedDate: "",
            order: 0,
            title: title
        })
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }, []);

    function changeFilter(value: FilterValueType, todolistID: string) {
        dispatchToTodoLists(changeTodolistFilterAC(value, todolistID))
    }
    function changeTodoListTitle(title: string, todolistID: string) {
        dispatchToTodoLists(changeTodolistTitleAC(title, todolistID))
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


export default AppWithReducer;
