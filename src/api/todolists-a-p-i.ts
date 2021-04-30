import axios from "axios"

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': 'bf0875ba-8463-481a-87a8-643832194416'
    }
})
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
}
type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}


export const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'bf0875ba-8463-481a-87a8-643832194416'
    }
}
export const todolistsAPI = {
       getTodolists() {
           return instance.get<Array<TodolistType>>("todo-lists")
       },
       createTodolist(title: string) {
           return instance.post<CreateTodolistResponseType>("todo-lists",{title})
       },
       deleteTodolist(todolistId:string) {
           return instance.delete<DeleteTodolistResponseType>(`todo-lists/${todolistId}`)
       },
       updateTodolist(todolistId: string, title: string) {
           return instance.put<UpdateTodolistResponseType>(`todo-lists/${todolistId}`, {title})
       }
}