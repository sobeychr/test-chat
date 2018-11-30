import { NEWUSER } from './types.js';

const defaultUser = {
    id: 0,
    name: ""
};

const UserReducer = (state=defaultUser, action) => {
    const type = action.type;

    if(type === NEWUSER) {
        return {...state,
            id: 5
        };
    }

    return state;
};

export default UserReducer;
