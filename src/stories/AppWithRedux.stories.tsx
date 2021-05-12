import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import AppWithRedux from "../app/App";
import {Provider} from "react-redux";
import { store } from '../app/store';

export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    argTypes: {}
} as Meta;

const Template: Story = (args) => <Provider store={store}> <AppWithRedux /> </Provider>;

export const AppWithReduxStories = Template.bind({});
AppWithReduxStories.args = {

};

