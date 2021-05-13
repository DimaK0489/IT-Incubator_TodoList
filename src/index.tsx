import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from './app/store';
import AppWithRedux from "./app/App";


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppWithRedux/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'));

serviceWorker.unregister();
