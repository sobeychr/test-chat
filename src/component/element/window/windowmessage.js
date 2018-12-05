import React from 'react';
import PropTypes from 'prop-types';

import store from './../../../reduxStore';

import WindowAvatar from './windowavatar';

import './../../../style/element/window/windowmessage.scss';

const storeState = store.getState();

const getAvatar = userid => {
    const users  = storeState.user;
    const user = users.find(entry => entry.id === userid);
    return user.avatar || 0;
};

const WindowMessage = ({userid, text, timestamp}) => {
    
    const avatar = getAvatar(userid);

    return (
        <div className="windowmessage">
            <WindowAvatar id={avatar} />
            {text}
        </div>
    );
};

export default WindowMessage;

WindowMessage.defaultProps = {
    userid: 0,
    text:   "",
    timestamp: 0
};
WindowMessage.propTypes = {
    userid: PropTypes.number.isRequired,
    text:   PropTypes.string,
    timestamp: PropTypes.number
};
