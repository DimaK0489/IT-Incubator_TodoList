import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import { store } from '../state/store';

export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    argTypes: {}
} as Meta;

const Template: Story = (args) => <Provider store={store}> <AppWithRedux /> </Provider>;

export const AppWithReduxStories = Template.bind({});
AppWithReduxStories.args = {

};

