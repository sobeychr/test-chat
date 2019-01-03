import * as Types from './types';

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
                return json;
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
        throw Error(response.statusText);
    }
    return response;
};

export const newAvatar = (id, avatar) => ({
    type: Types.NEWAVATAR,
    payload: { id, avatar }
});

export const newMessage = (userid, text) => ({
    type: Types.NEWMESSAGE,
    payload: { userid, text }
});

export const newUser = name => ({
    type: Types.NEWUSER,
    payload: { name }
});
