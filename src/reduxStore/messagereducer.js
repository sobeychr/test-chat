import * as Types from './types';

//const startingMessages = require('./../data/message.json');
const initMessages = {
    list: [],
    loading: false
};

const MessageReducer = (state=initMessages, action) => {
    const type = action.type;

    if(type === Types.INIT_START) {
        //return [...state];
        return {...state,
            loading: true
        };
    }
    else if(type === Types.INIT_END) {
        //console.log(action.payload);
        const payload = action.payload;
        return {...state,
            ...payload,
            loading: false
        };
    }
    else if(type === Types.NEWMESSAGE) {
        /*
        const payload = action.payload;
        const timestamp = Date.now();

        return [...state,
            { ...payload, timestamp }
        ];
        */
    }
    
    return state;
};

export default MessageReducer;
