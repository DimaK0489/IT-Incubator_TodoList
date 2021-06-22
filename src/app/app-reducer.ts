import {setIsLoggedInAC} from "../features/Todolists/Authorization/authReducer"
import {authAPI} from "../api/todolists-a-p-i";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

//Types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const initializeAppTC = createAsyncThunk("app/initializeApp", async (param, {dispatch}) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({isLoggedIn: true}));
        }
    } finally {
        dispatch(setAppInitializedAC({isInitialized: true}));
    }
})

const slice = createSlice({
    name: "app",
    initialState: {
        status: 'loading' as RequestStatusType,
        error: null as string | null,
        isInitialized: false
    },
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true
        })
    }
})
//Reducer
export const appReducer = slice.reducer
//Action create (reducers)
export const {setAppStatusAC, setAppErrorAC, setAppInitializedAC} = slice.actions
//Thunks
/*export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me( )
        .then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({isLoggedIn: true}));
            dispatch(setAppInitializedAC({isInitialized: true}))
        } else {
        }
    })
        .finally( () => {
            dispatch(setAppInitializedAC({isInitialized: true}));
        })
}*/
