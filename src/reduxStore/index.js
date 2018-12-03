import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import MessageReducer from './messagereducer';
import UserReducer from './userreducer';

const middleware = applyMiddleware(thunk, createLogger());

const store = createStore(
    combineReducers({
        user: UserReducer,
        message: MessageReducer
    }),
    middleware
);

export default store;
