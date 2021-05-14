import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {AddItemForm, AddItemFormPropsType,} from "../components/AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormStories = Template.bind({});
AddItemFormStories.args = {
    addItem: action("Clicked add item ")
};

export const AddItemFormDisabledStories = Template.bind({});
AddItemFormDisabledStories.args = {
    addItem: action("Disabled button ")
};


