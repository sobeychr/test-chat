import * as Types from './types';

export const fetchUsers = () => ({
    type: Types.FETCHUSER
});

export const newUser = name => ({
    type: Types.NEWUSER,
    payload: { name }
});
