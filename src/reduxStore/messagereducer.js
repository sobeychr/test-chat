import * as Types from './types';

const startingMessages = require('./../data/message.json');
// const startingMessages = [];

const MessageReducer = (state=startingMessages, action) => {
    const type = action.type;

    if(type === Types.FETCHMESSAGE) {
        return [...state];
    }
    else if(type === Types.NEWMESSAGE) {
        const payload = action.payload;
        const timestamp = Date.now();

        return [...state,
            { ...payload, timestamp }
        ];
    }
    
    return state;
};

export default MessageReducer;
