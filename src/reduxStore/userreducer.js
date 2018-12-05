import * as Types from './types';

const startingUsers = require('./../data/user.json');
// const startingUsers = [];

const defaultUser = {
    id: 0,
    name: "",
    avatar: 1,
    status: 1,
    x: 0,
    y: 50,
    width: 200,
    height: 200
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

const UserReducer = (state=startingUsers, action) => {
    const type = action.type;

    if(type === Types.ENDDRAG) {
        return updateUser(state, action.payload);
    }
    else if(type === Types.NEWUSER) {
        const name = action.name;
        return [...state,
            {...defaultUser,
                id: state.length + 1,
                name
            }
        ];
    }

    return state;
};

export default UserReducer;
