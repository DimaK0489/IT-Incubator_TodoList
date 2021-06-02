import { setIsLoggedInAC } from "../features/Todolists/Login/authReducer"
import { Dispatch } from "redux"
import {authAPI} from "../api/todolists-a-p-i";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//Types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})
//Reducer
export const appReducer = slice.reducer
//Action create (reducers)
export const {setAppStatusAC, setAppErrorAC, setAppInitializedAC} = slice.actions
//Thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me( )
        .then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
            dispatch(setAppInitializedAC({isInitialized: true}))
        } else {
        }
    })
        .finally( () => {
            dispatch(setAppInitializedAC({isInitialized: true}));
        })
}
