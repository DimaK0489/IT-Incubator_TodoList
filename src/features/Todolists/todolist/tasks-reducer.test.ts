import {fetchTasksTC, removeTasksTC, tasksReducer, addTaskTC, updateTaskTC} from './tasks-reducer';
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC, todolistId1} from "./todoLists-reducer";
import {TaskPriorities, TaskStatuses} from "../../../api/todolists-a-p-i";
import { TasksStateType } from './Task/Task';
import {keys} from "@material-ui/core/styles/createBreakpoints";

let startState: TasksStateType
beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low}
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
            {id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low}
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    let param = {taskId: "2", todolistId: "todolistId2"}
    const action =  removeTasksTC.fulfilled(param,"requestId", param);
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id !== '2')).toBeTruthy()
});

test('correct task should be added to correct array', () => {
    let task = {
        todoListId: "todolistId2",
        title: "juice",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: 0,
        startDate: "",
        id: "exists"
    }
    const action = addTaskTC.fulfilled(task,"requestId", {title: task.title, todolistId: task.todoListId});
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {
    let param = {taskId: "2",model: {status:TaskStatuses.New}, todolistId: "todolistId2"}
    const action = updateTaskTC.fulfilled(param, "requestId", param);
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});
test('title of specified task should be changed', () => {
    let updateModel = {taskId: '2', model: {title: 'Yogurt'}, todolistId: 'todolistId2'}
    const action = updateTaskTC.fulfilled(updateModel,"requestId", updateModel)
    const endState = tasksReducer(startState,action)

    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId2'][1].title).toBe('Yogurt')
    expect(endState['todolistId2'][0].title).toBe('bread')
})

test('new array should be added when new todolist is added', () => {
    let param = {todolist: {
            id: "name",
            title: "new todolist",
            order: 0,
            addedDate: ""
        }}
    const action = addTodolistTC.fulfilled(param, "requestID", param.todolist.id);
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('property with todolistId should be deleted', () => {
    const action = removeTodolistTC.fulfilled({todolistId: 'todolistId2'},"requestId", 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(keys.length).toBe(5)
    expect(endState['todolistId2']).not.toBeDefined()
})
test("empty arrays should be added when we set todolists", () => {
    let param = {todolist: [
            {id: "1", title: "title1", order: 0, addedDate: ""},
            {id: "2", title: "title2", order: 0, addedDate: ""}
        ]}
    const action = fetchTodolistsTC.fulfilled(param, "requestId")
    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState["1"]).toStrictEqual([])
    expect(endState["2"]).toStrictEqual([])
})
test("tasks should be added for todolists", () => {
    //const action = setTasksAC({tasks: startState["todolistId1"], todolist: "todolistId1"})
    const action = fetchTasksTC.fulfilled({tasks: startState["todolistId1"], todolist: "todolistId1"}, "requestId",todolistId1)

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(0)

})




