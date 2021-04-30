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
               onChange={(e) => {
                   setTitle(e.currentTarget.value)
               }}/>
        <button onClick={createTodolist}> ADD Todolist</button>
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
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
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
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <input placeholder={"name"}
               value={title}
               onChange={(e) => {
                   setTitle(e.currentTarget.value)
               }}/>
        <button onClick={updateTodolist}>Up Todolist</button>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const getTask = () => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={"todolistID"}
               value={todolistId}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>

        <button onClick={getTask}>Get Task</button>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskTitle, setTaskTitle] = useState<string>("")

    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={"todolistID"}
               value={todolistId}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}/>
        <input placeholder={"Task Title"}
               value={taskTitle}
               onChange={(e) => {
                   setTaskTitle(e.currentTarget.value)
               }}/>
        <button onClick={createTask}>Add Task</button>
    </div>
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
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value)
                   }}/>
            <input placeholder={"taskId"}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <button onClick={deleteTask}>Del Task</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")
    const [title, setTitle] = useState<string>("title1")
    const [description, setDescription] = useState<string>("description 1")
    const [status, setStatus] = useState<number>(0)
    //const [completed, setCompleted] = useState<boolean>(true)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>("")
    const [deadline, setDeadline] = useState<string>("")
    const updateTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            deadline: "",
            description: description,
            priority: priority,
            startDate: "",
            status: status,
            title: title
        })
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
            <input placeholder={"taskId"} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={"description"} value={description} onChange={(e) => {setDescription(e.currentTarget.value)}}/>
            <input placeholder={"status"} value={status} onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
            <input placeholder={"priority"} value={priority} onChange={(e) => {setPriority(+e.currentTarget.value)}}/>

            <button onClick={updateTask}>Del Task</button>
        </div>
    </div>
}




