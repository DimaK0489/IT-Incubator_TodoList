import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {CommonResponseType} from "../api/todolists-a-p-i";
import {Dispatch} from "redux";

export const handleServerAppError = <T>(data: CommonResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}
export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppErrorAC(error.message ? {error: error.message} : {error: "Some error"}))
    dispatch(setAppStatusAC({status: "failed"}))
}

