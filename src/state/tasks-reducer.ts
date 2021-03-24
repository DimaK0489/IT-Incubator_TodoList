import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType, todolistId1, todolistId2} from "./todo-lists-reducer";
import {TasksStateType} from "../App";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    taskId: string,
    todolistId: string
}
export type AddTaskActionType = {
    type: "ADD_TASK"
    title: string
    todolistId: string
}
export type ChangeTaskActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todolistId: string
}

let initialState: TasksStateType = {
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
        {id: v1(), title: "Beef", isDone: false},
        {id: v1(), title: "Meat", isDone: true},
        {id: v1(), title: "Bread", isDone: false},
        {id: v1(), title: "Vegetables", isDone: false},
        {id: v1(), title: "Eggs", isDone: false},
        {id: v1(), title: "Water", isDone: true},
        {id: v1(), title: "Juice", isDone: false},
    ]
}

export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskActionType
    | ChangeTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType


export const tasksReducer = (state= initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const copyState = {...state}
            const todolistTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todolistTasks.filter(t => t.id !== action.taskId)
            return copyState
        }
        case "ADD_TASK": {
            const copyState = {...state}
            const newTask = {id: v1(), title: action.title, isDone: false}
            const todolistTasks = copyState[action.todolistId]
            copyState[action.todolistId] = [newTask, ...todolistTasks]
            return copyState
        }

        case "CHANGE-TASK-STATUS": {
            const todoListTasks = state[action.todolistId]
            const task = todoListTasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, isDone: action.isDone}
                    }else  {
                        return task
                    }
                })
            }
        }
        case "CHANGE-TASK-TITLE": {
            const todoListTasks = state[action.todolistId]
            const task = todoListTasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, title: action.title}
                    }else  {
                        return task
                    }
                })
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD_TASK", title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskActionType => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId}
}


