import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';
import './style/_global.scss';

const app = document.getElementById('app');
ReactDOM.render(<Routes/>, app);
