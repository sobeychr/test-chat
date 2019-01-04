import React from 'react';
import PropTypes from 'prop-types';

import store from 'ReduxStore';

import WindowAvatar from './windowavatar';
import WindowContent from './windowcontent';

import 'Style/element/window/windowmessage.scss';

var storeState = store.getState();
store.subscribe(() => {
    storeState = store.getState();
});

const getAvatarId = userid => {
    const users  = storeState.user.list;
    const user = users.find(entry => entry.id === userid);
    return user.avatar || 0;
};

const WindowMessage = ({self, userid, text, timestamp, windowWidth}) => {
    
    const avatarId = getAvatarId(userid);
    const avatarSize = 20;

    const isSelf = self === userid;
    const scrollMargin = 35;
    const width = windowWidth - avatarSize - scrollMargin

    return (
        <div className="windowmessage clearfix">
            <WindowAvatar id={avatarId} height={avatarSize} width={avatarSize}/>
            <WindowContent content={text} isSelf={isSelf} width={width}/>
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
    self: PropTypes.number.isRequired,
    userid: PropTypes.number.isRequired,
    text:   PropTypes.string,
    timestamp: PropTypes.number,
    windowWidth: PropTypes.number
};
