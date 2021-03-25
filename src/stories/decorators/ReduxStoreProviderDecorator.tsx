import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../state/tasks-reducer";
import {todolistId1, todolistId2, todoListsReducer} from "../../state/todo-lists-reducer";
import {v1} from "uuid";
import {AppRootStateType} from "../../state/store";
import {Provider} from "react-redux";
import React from "react";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})
const initialGlobalState = {
    todoLists: [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ],
    tasks: {
        [todolistId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beef", isDone: false}
        ]
    }
};
export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    <Provider store={storyBookStore}> { storyFn() } </Provider> }