import {v1} from "uuid";
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC, todolistId1, todolistId2} from "./todoLists-reducer";
import {TaskPriorities, TaskStatuses, todolistsAPI, UpdateTaskModelType} from "../../../api/todolists-a-p-i";
import {AppRootStateType} from "../../../app/store";
import {TasksStateType} from "./Task/Task";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/errorUtils";
import {setAppStatusAC} from "../../../app/app-reducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

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

//Thunks
export const fetchTasksTC = createAsyncThunk("tasks/fetchTasks", async (todolist: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    const res = await todolistsAPI.getTasks(todolist)
    const tasks = res.data.items
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return {tasks, todolist}
})
export const removeTasksTC = createAsyncThunk("tasks/removeTasks", async (param: { taskId: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    await todolistsAPI.deleteTask(param.todolistId, param.taskId)
    thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
    return {taskId: param.taskId, todolistId: param.todolistId}
})
export const addTaskTC = createAsyncThunk("tasks/addTask", async (param: { title: string, todolistId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerAppError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const updateTaskTC = createAsyncThunk("tasks/updateTask", async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string }, thunkAPI) => {
    const state = thunkAPI.getState() as AppRootStateType;
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        return thunkAPI.rejectWithValue("task not found");
    }
    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.model
    }
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            return param
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null);
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null);
    }
})

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
        /*addTaskAC(state, action: PayloadAction<TaskType>) {
            state[action.payload.todoListId].unshift(action.payload)
        },*/
        /*setTasksAC (state, action: PayloadAction<{tasks: Array<TaskType>, todolist: string}>) {
           state[action.payload.todolist] = action.payload.tasks
       },*/
        /*updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },*/
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
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
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })

    }
})
// Reducer
export const tasksReducer = slice.reducer

// Actions
//export const {} = slice.actions
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
/*export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
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
}*/
/*export const updateTaskTC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
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
    }*/


