import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {Task, TaskPropsType} from "../Task";
import {action} from "@storybook/addon-actions";

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
    task: {id:"1", title: "REACT", isDone: true},
    todolistId: "todolistId"
};
export const TaskIsNotDoneStories = Template.bind({});
TaskIsNotDoneStories.args = {
    ...baseArgs,
    task: {id:"1", title: "REACT", isDone: false},
    todolistId: "todolistId"
};


