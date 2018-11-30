import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'
import UserReducer from './userreducer'

const middleware = applyMiddleware(thunk, createLogger());
const store = createStore(UserReducer, middleware);

export default store;
