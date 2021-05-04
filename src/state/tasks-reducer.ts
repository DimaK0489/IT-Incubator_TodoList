import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType, todolistId1, todolistId2} from "./todo-lists-reducer";
import {TasksStateType} from "../App";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-a-p-i";

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
    status: TaskStatuses
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
        {id: v1(), title: "HTML", status: TaskStatuses.Completed, todoListId: todolistId1, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
        {id: v1(), title: "CSS", status: TaskStatuses.Completed, todoListId: todolistId1, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
        {id: v1(), title: "JS",status: TaskStatuses.New, todoListId: todolistId1, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
        {id: v1(), title: "REACT",status: TaskStatuses.Completed, todoListId: todolistId1, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
        {id: v1(), title: "REDUX",status: TaskStatuses.Completed, todoListId: todolistId1, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
        {id: v1(), title: "REST API",status: TaskStatuses.New, todoListId: todolistId1, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
        {id: v1(), title: "GraphQL", status: TaskStatuses.New, todoListId: todolistId1, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
        {id: v1(), title: "ANGULAR", status: TaskStatuses.New, todoListId: todolistId1, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
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
            const newTask: TaskType = {id: v1(), title: action.title, status: TaskStatuses.New,
                todoListId: action.todolistId, description: "", startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low}
            const todolistTasks = copyState[action.todolistId]
            copyState[action.todolistId] = [newTask, ...todolistTasks]
            return copyState
        }

        case "CHANGE-TASK-STATUS": {
            const todoListTasks = state[action.todolistId]
            const task = todoListTasks.find(t => t.id === action.taskId)
            if (task) {
                task.status = action.status
            }
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, isDone: action.status}
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
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskActionType => {
    return {type: "CHANGE-TASK-STATUS", taskId, status, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId}
}


