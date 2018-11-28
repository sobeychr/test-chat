const UserReducer = (state={
        id: 0,
        name: "",
        avatar: 0,
        status: 1,
        window: {
            x: 0,
            y: 50,
            width: 200,
            height: 200
        }
    }, action) => {

    const type = action.type;

    if(type === 'FETCH') {
        return {...state};
    }
    else if(type === 'NEW') {
        return {...state,
            id: (++id)
        };
    }

    return state;
};

export default UserReducer;
