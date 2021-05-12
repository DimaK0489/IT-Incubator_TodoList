import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from './app/store';
import AppWithRedux from "./app/App";
import AppWithReducer from "./trash/AppWithReducer";

const AppWithReducerComponent = AppWithReducer;

ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
