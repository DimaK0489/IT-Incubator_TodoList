import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {Provider} from "react-redux";
import { store } from '../app/store';
import App from "../app/App";

export default {
    title: 'TODOLIST/AppWithRedux',
    component: App,
    argTypes: {}
} as Meta;

const Template: Story = (args) => <Provider store={store}> <App /> </Provider>;

export const AppStories = Template.bind({});
AppStories.args = {

};

