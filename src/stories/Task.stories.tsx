import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {Task, TaskPropsType} from "../features/Todolists/todolist/Task/Task";
import {action} from "@storybook/addon-actions";
import {TaskStatuses, TaskPriorities} from "../api/Types";


export default {
    title: 'TODOLIST/Task',
    component: Task
} as Meta;

let changeStatus = action("Status changed inside Task")
let removeTask = action("Remove button inside clicked")
let changeTaskTitle = action("Title changed inside Task")

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeStatus,
    removeTask,
    changeTaskTitle
}

export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
    ...baseArgs,
    task: {id:"1", title: "REACT", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "",
        startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
    todolistId: "todolistId"
};
export const TaskIsNotDoneStories = Template.bind({});
TaskIsNotDoneStories.args = {
    ...baseArgs,
    task: {id:"1", title: "REACT", status: TaskStatuses.New, todoListId: "todolistId1", description: "",
        startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low},
    todolistId: "todolistId"
};


