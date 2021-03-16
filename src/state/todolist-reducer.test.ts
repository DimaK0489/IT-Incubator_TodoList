import {addTodolistAC,changeTodolistFilterAC,changeTodolistTitleAC,removeTodolistAC,todoListReducer
} from './todolist-reducer';
import {v1} from 'uuid';
import {FilterValueType, TodoListType} from '../App';

let todolistId1: string
let todolistId2: string
let startState: Array<TodoListType>

beforeEach( () => {
     todolistId1 = v1();
     todolistId2 = v1();
     startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
    expect(endState === startState).toBeFalsy()
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";
    const endState = todoListReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("all");
    expect(endState[2].id).toBeDefined()
    expect(endState === startState).toBeFalsy()
});

test('correct todolist should change it is name', () => {

    let newTodolistTitle = "New Todolist";
    const action = changeTodolistTitleAC (todolistId2, newTodolistTitle )
    const endState = todoListReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValueType = "completed";
    const action = changeTodolistFilterAC(todolistId2, newFilter)
    const endState = todoListReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});








