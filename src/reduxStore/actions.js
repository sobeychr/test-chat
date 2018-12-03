import * as Types from './types';

export const endDrag = (id, x, y) => ({
    type: Types.ENDDRAG,
    payload: { id, x, y }
});

export const fetchUsers = () => ({
    type: Types.FETCHUSER
});

export const newUser = name => ({
    type: Types.NEWUSER,
    payload: { name }
});
