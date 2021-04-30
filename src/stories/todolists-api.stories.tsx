import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-a-p-i";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")

    const createTodolist = () => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <input placeholder={"name"}
               value={title}
               onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
        <button onClick={createTodolist}> ADD Todolist </button>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const deleteTodolist = () => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <input placeholder={"todolistId"}
               value={todolistId}
               onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
        <button onClick={deleteTodolist}>Del Todolist</button>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const updateTodolist = () => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={"todolistId"}
               value={todolistId}
               onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={"name"}
               value={title}
               onChange={(e) => {setTitle(e.currentTarget.value)}}/>
        <button onClick={updateTodolist}>Up Todolist</button>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "4a92db23-263c-44f6-a13f-9ee71df56784"
    useEffect(() => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")
    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"}
                   value={taskId}
                   onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
            <input placeholder={"taskId"}
                   value={todolistId}
                   onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
            <button onClick={deleteTask}>Del Task</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = ""
        const taskId = ""
        todolistsAPI.updateTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const createTask = () => {
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={"todolistID"}
               value={todolistId}
               onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={"title"}
               value={title}
               onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
        <button onClick={createTask}>Add Task</button>
    </div>
}

