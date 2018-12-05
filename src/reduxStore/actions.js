import * as Types from './types';

export const endDrag = (id, x, y) => ({
    type: Types.ENDDRAG,
    payload: { id, x, y }
});

export const init = () => ({
    type: Types.INIT
});

export const newMessage = (userid, text) => ({
    type: Types.NEWMESSAGE,
    payload: { userid, text }
});

export const newUser = name => ({
    type: Types.NEWUSER,
    payload: { name }
});
