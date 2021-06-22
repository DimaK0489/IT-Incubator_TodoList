import axios from "axios"
import {CommonResponseType, TodolistType, GetTasksResponse, TaskType, UpdateTaskModelType, LoginParamsType, AuthMeResponseType} from "./Types";

// Settings
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': 'bf0875ba-8463-481a-87a8-643832194416'
    }
})

// API
export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: TodolistType }>>("todo-lists", {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<CommonResponseType<{item: TaskType }>>(`todo-lists/${todolistId}/tasks`,{title: taskTitle})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<CommonResponseType<{userId: number}>>("auth/login", data)
    },
    me() {
        return instance.get<CommonResponseType<AuthMeResponseType>>("auth/me")
    },
    logout() {
        return instance.delete<CommonResponseType>("auth/login")
    }
}
