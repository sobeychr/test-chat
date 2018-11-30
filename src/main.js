import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Routes from './routes';
import store from './redux';

import './style/default.scss';

const app = document.getElementById('app');
render(<Provider store={store}>
        <Routes />
    </Provider>,
app);

const test = () => dispatch => {
    dispatch({
        type: 'NEWUSER'
    });
};

store.dispatch( test() );
