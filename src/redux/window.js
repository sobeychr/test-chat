// https://www.youtube.com/watch?v=DJ8fR0mZM44
/*
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const reducer = (state, action) => {

};

const store = createStore(reducer, 0);
store.subscribe(() => {
    console.log('store changed', store.getState());
});

const middleware = applyMiddleware(logger(), thunk);

store.dispatch({
    type: "TEST",
    payload: 1
});
*/

const windowReducer = (state={}, action) => {
    // let newState = {...state};
    // return newState;

    if(action.type === 'ADD') {
        // state = {...state, value: action.payload};
    }
    else if(action.type === 'REMOVE') {

    }
    else if(action.type === 'MOVE') {

    }
    return state;
};

export default windowReducer;