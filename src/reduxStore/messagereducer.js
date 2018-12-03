import * as Types from './types';

const startingMessages = require('./../data/message.json');
// const startingMessages = [];

const MessageReducer = (state=startingMessages, action) => {
    const type = action.type;

    if(type === Types.FETCHMESSAGE) {
        return [...state];
    }
    
    return state;
};

export default MessageReducer;
