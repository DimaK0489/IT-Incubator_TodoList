import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
}
type ChangeTodoListFilterActionType = {
    type: "CHANGE-FILTER"
    filter: FilterValueType
    id: string
}
type ChangeTodoListTitleActionType = {
    type: "CHANGE-TITLE"
    title: string
    id: string
}

export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListFilterActionType
    | ChangeTodoListTitleActionType

export const todoListReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            const newTodoListID = v1()
            const newTodoList: TodoListType = {
                id: newTodoListID, title: action.title, filter: "all"
            }
            return [newTodoList, ...state]
        }
        case "REMOVE-TODOLIST": {
            return state.filter(t => t.id !== action.id)
        }
        case "CHANGE-FILTER": {
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
        case "CHANGE-TITLE": {
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
        default: return  state
    }
}
export const RemoveTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}}
export const AddTodolistAC = (title: string): AddTodoListActionType => {
    return { type: "ADD-TODOLIST", title: title}}
export const ChangeTodolistTitleAC = (id: string, title:string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TITLE", title: title, id: id}}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-FILTER", filter: filter, id: id}}