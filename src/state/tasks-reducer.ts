import {TasksStateType} from "../App";
import {v1} from "uuid";

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

export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskActionType
    | ChangeTitleActionType


export const tasksReducer = (state: TasksStateType, action: ActionType) => {
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
            const copyState = {...state}
            const todoListTasks = copyState[action.todolistId]
            const task = todoListTasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return copyState
        }
        case "CHANGE-TASK-TITLE": {
            const copyState = {...state}
            const todoListTasks = copyState[action.todolistId]
            const task = todoListTasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return copyState
        }

        default:
            throw new Error("I dont understand this type")
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


