import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC, setTodolistsAC, todolistId1, todolistId2} from "./todoLists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../../api/todolists-a-p-i";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../app/store";
import {TasksStateType} from "./Task/Task";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/errorUtils";
import {setAppStatusAC} from "../../../app/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


let initialState: TasksStateType = {
    [todolistId1]: [
        {
            id: v1(), title: "HTML", status: TaskStatuses.Completed, todoListId: todolistId1, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
        },
        {
            id: v1(), title: "CSS", status: TaskStatuses.Completed, todoListId: todolistId1, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
        },
        {
            id: v1(), title: "JS", status: TaskStatuses.New, todoListId: todolistId1, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
        }

    ],
    [todolistId2]: [
        {
            id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: todolistId2, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
        },
        {
            id: v1(), title: "Beef", status: TaskStatuses.New, todoListId: todolistId2, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
        }

    ]
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const fetchTasksTC = createAsyncThunk("tasks/fetchTasks", async (todolist: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    const res = await todolistsAPI.getTasks(todolist)
    const tasks = res.data.items
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return {tasks, todolist}
})
export const removeTasksTC = createAsyncThunk("tasks/removeTasksTC", async (param: { taskId: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    await todolistsAPI.deleteTask(param.todolistId, param.taskId)
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return {taskId: param.taskId, todolistId: param.todolistId}
})
/*export const addTaskTC = createAsyncThunk("tasks/addTaskTC", (param: { title: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    return todolistsAPI.createTask(param.todolistId, param.title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                return { title: string, todolistId: string }
                thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
            }
        })
        .catch((error) => {
            handleServerAppError(error, thunkAPI.dispatch)
        })
})*/

const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        /*removeTaskAC (state, action: PayloadAction<{taskId: string, todolistId: string}>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if(index > -1) {
                tasks.splice(index,1)
            }
        },*/
        addTaskAC(state, action: PayloadAction<TaskType>) {
            state[action.payload.todoListId].unshift(action.payload)
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        /*setTasksAC (state, action: PayloadAction<{tasks: Array<TaskType>, todolist: string}>) {
            state[action.payload.todolist] = action.payload.tasks
        },*/
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = [];
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolist.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolist] = action.payload.tasks
        })
        builder.addCase(removeTasksTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })

    }
})
// Reducer
export const tasksReducer = slice.reducer

// Actions
export const {addTaskAC, updateTaskAC} = slice.actions

//Thunks
/*export const fetchTasksTC = (todolist: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.getTasks(todolist)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC({tasks, todolist}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}*/
/*export const removeTasksTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId,taskId)
        .then((res) => {
            dispatch(removeTaskAC({taskId, todolistId}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}*/

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTaskTC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn("task not found")
            return;
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...model
        }
        dispatch(setAppStatusAC({status: "loading"}))
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({taskId, model, todolistId}))
                    dispatch(setAppStatusAC({status: "succeeded"}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }


