import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../../../api/todolists-a-p-i";
import {RequestStatusType, setAppStatusAC,} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/errorUtils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const todolistId1 = v1()
export const todolistId2 = v1()

//Thunks
export const fetchTodolistsTC = createAsyncThunk("todolist/fetchTodolists", async (param, thunkAPI) =>  {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    const res = await todolistsAPI.getTodolists()
    try {
        thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
        return {todolist: res.data}
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})
export const removeTodolistTC = createAsyncThunk("todolist/removeTodolist", async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    thunkAPI.dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: "loading"}))
    await todolistsAPI.deleteTodolist(todolistId)
    try {
        thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
        return {todolistId: todolistId}
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})
export const addTodolistTC = createAsyncThunk("todolist/addTodolist", async (title: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    const res = await todolistsAPI.createTodolist(title)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})
export const changeTodolistTitleTC = createAsyncThunk("todolist/changeTodolistTitle", async (param: { title: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    await todolistsAPI.updateTodolist(param.todolistId, param.title)
    try {
        thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
        return param
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})

//Types
export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}

const slice = createSlice({
    name: "todolist",
    initialState: [
        // {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
        // {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ""},
    ] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ filter: FilterValueType, todolistId: string }>) {
            const index = state.findIndex(t => t.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(t => t.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolist.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(t => t.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(t => t.id === action.payload.todolistId)
            state[index].title = action.payload.title
        })
    }
})
//Reducer
export const todoListsReducer = slice.reducer
//Action create (reducers)
export const {changeTodolistFilterAC, changeTodolistEntityStatusAC} = slice.actions
//Thunks
/*export const fetchTodolistsTC = () => (dispatch: Dispatch, getState: () => AppRootStateType): void => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setAppStatusAC({status: "succeeded"}))
            dispatch(setTodolistsAC({todolist: res.data}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}*/
/*export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
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
}*/
/*export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
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
}*/
/*export const changeTodolistTitleTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.updateTodolist(todolistId, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC({todolistId: todolistId, title: title}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}*/


