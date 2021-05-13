import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../../../api/todolists-a-p-i";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../app/store";
import {
    setAppStatusAC,
    SetAppStatusActionType,
    RequestStatusType,
    setAppErrorAC,
    SetAppErrorActionType
} from "../../../app/app-reducer";

export const todolistId1 = v1()
export const todolistId2 = v1()
let initialState: Array<TodolistDomainType> = [
    // {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
    // {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ""},
];

//Types
export type ActionType =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | SetTodolistActionType
    | SetAppStatusActionType
    | SetAppErrorActionType

export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>
export type AddTodoListActionType = ReturnType<typeof addTodolistAC>

export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}

export const todoListsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state]
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id
                ? {...tl, filter: action.filter}
                : tl)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todolistId
                ? {...tl, title: action.title}
                : tl)
        case "SET-TODOLIST":
            return action.todolist.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        case "CHANGE-TODOLIST-ENTITY_STATUS":

        default:
            return state
    }
}
//actions
export const removeTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', id: todolistId} as const)

export const addTodolistAC = (todolist: TodolistType) =>
    ({type: "ADD-TODOLIST", todolist} as const)

export const changeTodolistTitleAC = (todolistId: string, title: string) =>
    ({type: "CHANGE-TODOLIST-TITLE", todolistId: todolistId, title: title} as const)

export const changeTodolistFilterAC = (filter: FilterValueType, todolistId: string) =>
    ({type: "CHANGE-TODOLIST-FILTER", filter: filter, id: todolistId} as const)

export const setTodolistsAC = (todolist: Array<TodolistType>) =>
    ({type: "SET-TODOLIST", todolist} as const)
export const changeTodolistEntityStatusAC  = (id: string, entityStatus: RequestStatusType) =>
    ({type: "CHANGE-TODOLIST-ENTITY_STATUS", id, entityStatus} as const)

//Thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType): void => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(setTodolistsAC(res.data))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC("succeeded"))
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                }else {
                    dispatch(setAppErrorAC('Some error'))
                }
                dispatch(setAppStatusAC("failed"))
            }
        })
}

export const changeTodolistTitleTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.updateTodolist(todolistId, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(todolistId, title))
            dispatch(setAppStatusAC("succeeded"))
        })
}


