import {tasksReducer} from '../features/Todolists/todolist/tasks-reducer';
import {todoListsReducer} from "../features/Todolists/todolist/todoLists-reducer";
import {combineReducers} from 'redux';
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from '../features/Todolists/Login/authReducer';
import {configureStore} from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём store
//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type RootReducerType = typeof rootReducer;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunkMiddleware)
})
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<RootReducerType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

export type AppDispatchType = typeof store.dispatch
