import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}
type ChangeTodoListFilterActionType = {
    type: "CHANGE--TODOLIST-FILTER"
    filter: FilterValueType
    id: string
}
type ChangeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string
}
export const todolistId1 = v1()
export const todolistId2 = v1()
let initialState: Array<TodoListType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
]

export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListFilterActionType
    | ChangeTodoListTitleActionType

export const todoListsReducer = (state= initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            return [...state, {id: action.todolistId, title: action.title, filter: "all"}]
        }
        case "REMOVE-TODOLIST": {
            return state.filter(t => t.id !== action.id)
        }
        case "CHANGE--TODOLIST-FILTER": {
            /* const todolist = state.find(t => t.id === action.id)
             if (todolist) {
                 todolist.filter = action.filter
                 return [...state]
             }
             return state*/
            return state.map(tl => {
                if(tl.id === action.id){
                    return {...tl, filter: action.filter}
                }else {
                    return tl
                }
            })
        }
        case "CHANGE-TODOLIST-TITLE": {
            /*const todolist = state.find(t => t.id === action.id)
            if (todolist) {
                todolist.title = action.title
                return [...state]
            }
            return state*/
            return state.map(tl => {
                if(tl.id === action.id){
                    return {...tl, title: action.title}
                }else {
                    return tl
                }
            })
        }
        default: return state
    }
}
export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}}
export const addTodolistAC = (title: string): AddTodoListActionType => {
    return { type: "ADD-TODOLIST", title: title, todolistId: v1()}}
export const changeTodolistTitleAC = (id: string, title:string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", title: title, id: id}}
export const changeTodolistFilterAC = (filter: FilterValueType, todolistID: string): ChangeTodoListFilterActionType => {
    return {type: "CHANGE--TODOLIST-FILTER", filter: filter, id: todolistID}}