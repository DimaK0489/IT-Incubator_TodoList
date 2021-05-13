import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../../../api/todolists-a-p-i";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../app/store";

export const todolistId1 = v1()
export const todolistId2 = v1()
let initialState: Array<TodolistDomainType> = [
    {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
    {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ""},
];

//Types
export type ActionType =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | SetTodolistActionType

export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodolistAC>
export type AddTodoListActionType = ReturnType<typeof addTodolistAC>

export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter?: FilterValueType
}

export const todoListsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all"}, ...state]
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
            return action.todolist.map(tl => ({...tl,filter: "all"}))
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
    ({type: "CHANGE-TODOLIST-TITLE",todolistId: todolistId,title: title} as const)

export const changeTodolistFilterAC = (filter: FilterValueType, todolistId: string) =>
    ({type: "CHANGE-TODOLIST-FILTER",filter: filter,id: todolistId} as const)

export const setTodolistsAC = (todolist: Array<TodolistDomainType>) =>
    ({type: "SET-TODOLIST", todolist} as const)

//Thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType): void => {
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const changeTodolistTitleTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.updateTodolist(todolistId, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}


