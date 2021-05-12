import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {EditTablePropsType, EditTableSpan} from "../components/EditableSpan/EditTableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TODOLIST/EditTableSpan',
    component: EditTableSpan,
    argTypes: {
        title: {
            defaultValue: "React"
        }
    }
} as Meta;

const Template: Story<EditTablePropsType> = (args) => <EditTableSpan {...args} />;

export const EditTableSpanStories = Template.bind({});
EditTableSpanStories.args = {
    changeItem: action("Value changed")
};
export const EditTableSpan2Stories = Template.bind({});
EditTableSpan2Stories.args = {
    changeItem: action("Value changed")
};
