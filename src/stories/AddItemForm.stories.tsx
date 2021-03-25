import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
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


