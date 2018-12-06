import React from 'react';
import PropTypes from 'prop-types';

import store from './../../../reduxStore';

import { getColor, getImgId } from './windowavatar.func';
import WindowAvatar from './windowavatar';

import './../../../style/element/window/windowmessage.scss';

const storeState = store.getState();

const getAvatarId = userid => {
    const users  = storeState.user;
    const user = users.find(entry => entry.id === userid);
    return user.avatar || 0;
};

const WindowMessage = ({userid, text, timestamp, windowWidth}) => {
    
    const avatarId = getAvatarId(userid);
    const avatarSize = 20;

    const scrollMargin = 35;

    const styles = {
        width: windowWidth - avatarSize - scrollMargin
    };

    return (
        <div className="windowmessage">
            <WindowAvatar id={avatarId} height={avatarSize} width={avatarSize}/>
            <span className="text" style={styles}>
                {text}
            </span>
        </div>
    );
};

export default WindowMessage;

WindowMessage.defaultProps = {
    userid: 0,
    text:   "",
    timestamp: 0,
    windowWidth: 200
};
WindowMessage.propTypes = {
    userid: PropTypes.number.isRequired,
    text:   PropTypes.string,
    timestamp: PropTypes.number,
    windowWidth: PropTypes.number
};
