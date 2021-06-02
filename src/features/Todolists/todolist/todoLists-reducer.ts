import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../../../api/todolists-a-p-i";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../app/store";
import {RequestStatusType,setAppStatusAC,} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/errorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const todolistId1 = v1()
export const todolistId2 = v1()
let initialState: Array<TodolistDomainType> = [
    // {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
    // {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ""},
];

//Types
export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}

const slice = createSlice( {
    name: "todolist",
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{todolistId: string}>) {
            const index = state.findIndex(t => t.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{todolist: TodolistType}>) {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{todolistId: string, title: string}>) {
            const index = state.findIndex(t => t.id === action.payload.todolistId)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{filter: FilterValueType, todolistId: string}>) {
            const index = state.findIndex(t => t.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        setTodolistsAC(state, action: PayloadAction<{todolist: Array<TodolistType>}>) {
            return action.payload.todolist.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{id: string, entityStatus: RequestStatusType}>) {
            const index = state.findIndex(t => t.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        }
    }
})
//Reducer
export const todoListsReducer = slice.reducer
//Action create (reducers)
export const {removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC,
    setTodolistsAC, changeTodolistEntityStatusAC} = slice.actions
//Thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch, getState: () => AppRootStateType): void => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setAppStatusAC({status: "succeeded"}))
            dispatch(setTodolistsAC({todolist: res.data}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: "loading"}))
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC({todolistId: todolistId}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC({todolist: res.data.data.item}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const changeTodolistTitleTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.updateTodolist(todolistId, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC({todolistId: todolistId, title: title}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


