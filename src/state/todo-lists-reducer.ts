import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-a-p-i";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export const todolistId1 = v1()
export const todolistId2 = v1()
let initialState: Array<TodolistDomainType> = [
    {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
    {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ""},
];

export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListFilterActionType
    | ChangeTodoListTitleActionType
    | SetTodolistActionType

export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter?: FilterValueType
}

export const todoListsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all",
                addedDate: "",
                order: 0
            }, ...state]
        }
        case "REMOVE-TODOLIST": {
            return state.filter(t => t.id !== action.id)
        }
        case "CHANGE--TODOLIST-FILTER": {
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                } else {
                    return tl
                }
            })
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
        }
        case "SET-TODOLIST": {
            return action.todolist.map(tl => {
                return {
                    ...tl,
                    filter: "all"
                }
            })
        }
        default:
            return state
    }
}
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export type RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>

export const addTodolistAC = (title: string) => ({type: "ADD-TODOLIST", title: title, todolistId: v1()} as const)
export type AddTodoListActionType = ReturnType<typeof addTodolistAC>

export const changeTodolistTitleAC = (id: string, title: string) => ({type: "CHANGE-TODOLIST-TITLE", title: title, id: id} as const)
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistFilterAC = (filter: FilterValueType, todolistID: string) => ({type: "CHANGE--TODOLIST-FILTER", filter: filter, id: todolistID} as const)
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export const setTodolistsAC = (todolist: Array<TodolistDomainType>) => ({type: "SET-TODOLIST", todolist} as const)
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>
//Thunk
export const fetchTodolistsTC = () => (dispatch: Dispatch, getState: () => AppRootStateType): void => {
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}