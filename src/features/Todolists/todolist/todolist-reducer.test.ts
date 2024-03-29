import {
    addTodolistTC,
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    fetchTodolistsTC,
    FilterValueType,
    removeTodolistTC,
    TodolistDomainType,
    todoListsReducer,
    changeTodolistTitleTC
} from './todoLists-reducer';
import {v1} from 'uuid';
import {RequestStatusType} from "../../../app/app-reducer";
import {TodolistType} from "../../../api/Types";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach( () => {
     todolistId1 = v1();
     todolistId2 = v1();
     startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: "", entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: "", entityStatus: "idle"}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodolistTC.fulfilled({todolistId: todolistId1}, "requestId", "todolistId1"))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
    expect(endState === startState).toBeFalsy()
});

test('correct todolist should be added', () => {

    let todolist: TodolistType = {
        title: "New todolist",
        id: "any id",
        addedDate: "",
        order: 0

    }
    const endState = todoListsReducer(startState, addTodolistTC.fulfilled({todolist: todolist}, "requestId", todolistId2))

    expect(endState.length).toBe(3);
    expect(endState[2].filter).toBe("all");
    expect(endState[2].id).toBeDefined()
    expect(endState === startState).toBeFalsy()
});

test('correct todolist should change it is name', () => {

    let newTodolistTitle = "New Todolist";
    let param = {todolistId: todolistId2, title: newTodolistTitle}
    const action = changeTodolistTitleTC.fulfilled (param, "ruquestId", param)
    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValueType = "completed";
    const action = changeTodolistFilterAC({filter: newFilter, todolistId: todolistId2})
    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
test("todolists should be set to the test_test", () => {
    const action = fetchTodolistsTC.fulfilled({todolist: startState}, "requestId")

    const endState = todoListsReducer([], action)

    expect(endState.length).toBe(2)
})
test('correct entity status of todolist should be changed', () => {

    let newStatus: RequestStatusType = "loading";
    const action = changeTodolistEntityStatusAC({id: todolistId2, entityStatus: newStatus})
    const endState = todoListsReducer(startState, action);

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});








