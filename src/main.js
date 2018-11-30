import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Routes from './routes';
import store from './reduxStore';

import './style/default.scss';

const app = document.getElementById('app');
render(<Provider store={store}>
        <Routes />
    </Provider>,
app);
