import {v1} from "uuid";
import {
    AddTodoListActionType,
    RemoveTodoListActionType,
    todolistId1,
    todolistId2,
    SetTodolistActionType
} from "./todo-lists-reducer";
import {TasksStateType} from "../App";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../api/todolists-a-p-i";
import {Dispatch} from "redux";

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
        },
        {
            id: v1(), title: "REACT", status: TaskStatuses.Completed, todoListId: todolistId1, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
        },
        {
            id: v1(), title: "REDUX", status: TaskStatuses.Completed, todoListId: todolistId1, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
        },
        {
            id: v1(), title: "REST API", status: TaskStatuses.New, todoListId: todolistId1, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
        },
        {
            id: v1(), title: "GraphQL", status: TaskStatuses.New, todoListId: todolistId1, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
        },
        {
            id: v1(), title: "ANGULAR", status: TaskStatuses.New, todoListId: todolistId1, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
        },
    ],
    [todolistId2]: [
        {
            id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: todolistId2, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
        },
        {
            id: v1(), title: "Beef", status: TaskStatuses.New, todoListId: todolistId2, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
        },
        {
            id: v1(), title: "Meet", status: TaskStatuses.Completed, todoListId: todolistId2, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
        },
        {
            id: v1(), title: "Bred", status: TaskStatuses.New, todoListId: todolistId2, description: "",
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
        }
    ]
}

export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskActionType
    | ChangeTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodolistActionType
    | SetTasksActionType


export const tasksReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const copyState = {...state}
            const todolistTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todolistTasks.filter(t => t.id !== action.taskId)
            return copyState
        }
        case "ADD_TASK": {
            const copyState = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todolistId,
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low
            }
            const todolistTasks = copyState[action.todolistId]
            copyState[action.todolistId] = [newTask, ...todolistTasks]
            return copyState
        }
        case "CHANGE-TASK-STATUS": {
            const todoListTasks = state[action.todolistId]
            const task = todoListTasks.find(t => t.id === action.taskId)
            if (task) {
                task.status = action.status
            }
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, isDone: action.status}
                    } else {
                        return task
                    }
                })
            }
        }
        case "CHANGE-TASK-TITLE": {
            const todoListTasks = state[action.todolistId]
            const task = todoListTasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, title: action.title}
                    } else {
                        return task
                    }
                })
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case "SET-TODOLIST": {
            const copeState = {...state}
            action.todolist.forEach(tl => {
                copeState[tl.id] = [];
            })
            return copeState
        }
        case "SET_TASKS": {
            const copeState = {...state}
            copeState[action.todolists] = action.tasks
            return copeState
        }
        default:
            return state
    }
}
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: "REMOVE-TASK", taskId, todolistId} as const)
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export const addTaskAC = (title: string, todolistId: string) => ({type: "ADD_TASK", title, todolistId} as const)
export type AddTaskActionType = ReturnType<typeof addTaskAC>

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({
    type: "CHANGE-TASK-STATUS", taskId, status, todolistId
} as const)
export type ChangeTaskActionType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({
    type: "CHANGE-TASK-TITLE", taskId, title, todolistId} as const)
export type ChangeTitleActionType = ReturnType<typeof changeTaskTitleAC>

export const setTasksAC = (tasks: Array<TaskType>, todolists: string) => ({
    type: "SET_TASKS", tasks, todolists} as const)
export type SetTasksActionType = ReturnType<typeof setTasksAC>

//Thunk
export const fetchTasksTC = (todolist: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolist)
        .then((res) => {
            let tasks = res.data.items
            dispatch(setTasksAC(tasks, todolist))
        })
}

