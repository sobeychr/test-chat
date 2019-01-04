import * as Types from './types';

const server = 'http://localhost:3300/';
const serverInit    = 'init';
const serverMessage = 'message';
const serverUser    = 'user';

// Init the application - loads users and messages
export const init = () => {
    return dispatch => {
        dispatch( initStart() );
        fetch(server + serverInit)
            .then(loadError)
            .then(res => res.json())
            .then(json => {
                dispatch( initEnd(json) );
            })
    };
};

const initStart = () => ({
    type: Types.INIT_START
});
const initEnd = json => ({
    type: Types.INIT_END,
    payload: json
});
const loadError = response => {
    if(!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

/*
export const endDrag = (id, x, y) => ({
    type: Types.ENDDRAG,
    payload: { id, x, y }
});

export const init = () => {
    return dispatch => {
        dispatch( initStart() );
        return fetch('http://localhost:3300/message')
            .then(initError)
            .then(res => res.json())
            .then(json => {
                dispatch( initEnd(json) );
            });
    };
};

const initStart = () => ({
    type: Types.INIT_START
});
const initEnd = list => ({
    type: Types.INIT_END,
    payload: { list }
});
const initError = response => {
    if(!response.ok) {
        console.log('initError', response, response.json());
        throw Error(response.statusText);
    }
    return response;
};

export const newAvatar = (id, avatar) => ({
    type: Types.NEWAVATAR,
    payload: { id, avatar }
});

export const newMessage = (userid, text) => {
    return dispatch => {
        dispatch( newMessageInit() );

        const data = {
            userid, text
        };
        const obj = {
            method: 'POST',
            cache: 'no-cache',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        return fetch('http://localhost:3300/message', obj)
            .then(res => res.json())
            .then(json => {
                dispatch( newMessageEnd(json) );
            });
    };
};

const newMessageInit = () => ({
    type: Types.NEWMES_START
});
const newMessageEnd = list => ({
    type: Types.NEWMES_END,
    payload: { list }
});

export const newUser = name => ({
    type: Types.NEWUSER,
    payload: { name }
});
*/
