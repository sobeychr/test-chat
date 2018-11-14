import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Routes from './routes';
import store from './redux/store';

import './style/default.scss';

const app = document.getElementById('app');
ReactDOM.render(<Provider>
        <Routes />
    </Provider>,
app);