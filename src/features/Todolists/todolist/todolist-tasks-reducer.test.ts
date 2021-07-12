import {
    addTodolistTC,
    removeTodolistTC,
    TodolistDomainType,
    todolistId1,
    todolistId2,
    todoListsReducer
} from "./todoLists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "./Task/Task";
import {TaskPriorities, TaskStatuses, TodolistType} from "../../../api/Types";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];
    let todolist: TodolistType = {
        title: "New todolist",
        id: "any id",
        addedDate: "",
        order: 0

    }
    const action = addTodolistTC.fulfilled({todolist}, "requestID", todolist.title);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low
            }
        ]
    };
    // @ts-ignore
    const action = removeTodolistTC({todolistId: "todolistId2"}, "requestId");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
});
