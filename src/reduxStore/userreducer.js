import * as Types from './types';

//const userData = require('./../data/user.json');
const userData = {
    list: [],
    loading: false
};

const updateUser = (list, props) => {
    const { id } = props;
    const newList = [];

    list.forEach(entry => {
        if(entry.id === id) {
            newList.push( {...entry, ...props} );
        }
        else {
            newList.push(entry);
        }
    });
    
    return newList;
};

const UserReducer = (state=userData, action) => {
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
            list: payload.user
        };
    }
    
    /*
    if(type === Types.ENDDRAG) {
        return updateUser(state, payload);
    }
    else if(type === Types.INIT_START) {
        return [...state];
    }
    else if(type === Types.NEWAVATAR) {
        return updateUser(state, payload);
    }
    else if(type === Types.NEWUSER) {
        const name = payload.name;
        return [...state,
            {...defaultUser,
                id: state.length + 1,
                name
            }
        ];
    }
    */

    return state;
};

export default UserReducer;
