import './styles/main.scss';
import ReactDOM from 'react-dom';
import React from 'react';
import {App} from './components/App';
import {Provider} from 'mobx-react'
import dataStore from './DataStore'

const Root = (
    <Provider dataStore={dataStore}>
        <App />
    </Provider>
);
const approot = document.getElementById('react-app');

console.log("dataStore", dataStore);

ReactDOM.render(Root, approot);