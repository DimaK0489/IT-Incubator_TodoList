import {v1} from "uuid";
import {
    AddTodoListActionType,
    RemoveTodoListActionType,
    SetTodolistActionType,
    todolistId1,
    todolistId2
} from "./todoLists-reducer";

import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../../api/todolists-a-p-i";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../app/store";
import {TasksStateType} from "./Task/Task";

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

//Types
export type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodolistActionType
    | ReturnType<typeof setTasksAC>

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


export const tasksReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}
        case "ADD_TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
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
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case "SET-TODOLIST": {
            const copeState = {...state}
            action.todolist.forEach(tl => {
                copeState[tl.id] = []
            })
            return copeState
        }
        case "SET_TASKS":
            return {...state, [action.todolists]: action.tasks}
        default:
            return state
    }
}
//actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: "REMOVE-TASK", taskId, todolistId} as const)

export const addTaskAC = (task: TaskType) =>
    ({type: "ADD_TASK", task} as const)

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: "UPDATE-TASK", model, todolistId, taskId} as const)

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) =>
    ({type: "CHANGE-TASK-TITLE", taskId, title, todolistId} as const)

export const setTasksAC = (tasks: Array<TaskType>, todolists: string) =>
    ({type: "SET_TASKS", tasks, todolists} as const)

//Thunks
export const fetchTasksTC = (todolist: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.getTasks(todolist)
        .then((res) => {
            let tasks = res.data.items
            dispatch(setTasksAC(tasks, todolist))
        })
}

export const removeTasksTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.createTask(todolistId, title)
        .then((res) => {
            const task = res.data.data.item
            const action = addTaskAC(task)
            dispatch(action)
        })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
        const test_test = getState();
        const task = test_test.tasks[todolistId].find(t => t.id === taskId)
        if (!task){
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
            ...domainModel
        }
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                const action = updateTaskAC(taskId, domainModel, todolistId)
                dispatch(action)
            })
    }


