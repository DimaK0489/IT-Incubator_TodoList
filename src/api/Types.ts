//Types
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<{field: string, error: string}>
    data: T
}
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}
export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: string
}
export type AuthMeResponseType = {
    id: number
    email: string
    login: string
}