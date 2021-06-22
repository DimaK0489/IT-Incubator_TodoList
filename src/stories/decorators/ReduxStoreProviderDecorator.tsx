import {combineReducers} from "redux";
import {tasksReducer} from "../../features/Todolists/todolist/tasks-reducer";
import {todolistId1, todolistId2, todoListsReducer} from "../../features/Todolists/todolist/todoLists-reducer";
import {v1} from "uuid";
import {AppRootStateType, RootReducerType} from "../../app/store";
import {Provider} from "react-redux";
import React from "react";
import {appReducer} from "../../app/app-reducer";
import thunkMiddleware from "redux-thunk";
import {authReducer} from "../../features/Todolists/Authorization/authReducer";
import {configureStore} from "@reduxjs/toolkit";
import {TaskPriorities, TaskStatuses} from "../../api/Types";

const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer
})


const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "loading"}
    ],
    tasks: {
        [todolistId1]: [
            {id: v1(), title: "HTML", status: TaskStatuses.Completed, todoListId: todolistId1, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "CSS", status: TaskStatuses.New, todoListId: todolistId1, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: todolistId2, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "Beef", status: TaskStatuses.New, todoListId: todolistId2, description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low}
        ]
    },
    app: {
        error: null,
        status: "succeeded",
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
};
export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)});

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    <Provider store={storyBookStore}> { storyFn() } </Provider> }
