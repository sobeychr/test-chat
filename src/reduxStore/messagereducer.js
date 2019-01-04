import * as Types from './types';

const messageData = {
    list: [],
    loading: false
};

const MessageReducer = (state=messageData, action) => {
    const payload = action.payload || {};
    const type = action.type;

    if(type === Types.INIT_START) {
        return {...state,
            loading: true
        };
    }
    else if(type === Types.INIT_END) {
        return {...state,
            loading: false,
            list: payload.message
        };
    }

    /*
    if(type === Types.INIT_START) {
        return {...state,
            loading: true
        };
    }
    else if(type === Types.INIT_END) {
        return {...state,
            ...payload,
            loading: false
        };
    }
    else if(type === Types.NEWMES_START) {
        return {...state,
            loading: true
        };
    }
    else if(type === Types.NEWMES_END) {
        return {...state,
            ...payload,
            loading: false
        };
    }
    */
    /*
    else if(type === Types.NEWMESSAGE) {
        const payload = action.payload;
        const timestamp = Date.now();

        return [...state,
            { ...payload, timestamp }
        ];
    }
    */
    
    return state;
};

export default MessageReducer;
