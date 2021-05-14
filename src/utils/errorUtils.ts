import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {CommonResponseType} from "../api/todolists-a-p-i";
import {Dispatch} from "redux";

export const handleServerAppError = <T>(data: CommonResponseType<T>, dispatch: Dispatch<ErrorActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error'))
    }
    dispatch(setAppStatusAC('failed'))
}
export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch<ErrorActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : "Some error"))
    dispatch(setAppStatusAC("failed"))
}

type ErrorActionType = SetAppStatusActionType | SetAppErrorActionType