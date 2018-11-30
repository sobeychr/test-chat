import * as Types from './types';

export const newUser = name => dispatch => {
    dispatch({
        type: Types.NEWUSER,
        name
    });
};
