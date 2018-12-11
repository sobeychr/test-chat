import React from 'react';
import PropTypes from 'prop-types';

import store from 'ReduxStore';

import { getColor, getImgId } from './windowavatar.func';
import WindowAvatar from './windowavatar';

import 'Style/element/window/windowmessage.scss';

var storeState = store.getState();
store.subscribe(() => {
    storeState = store.getState();
});

const getAvatarId = userid => {
    const users  = storeState.user;
    const user = users.find(entry => entry.id === userid);
    return user.avatar || 0;
};

const WindowMessage = ({self, userid, text, timestamp, windowWidth}) => {
    
    const avatarId = getAvatarId(userid);
    const avatarSize = 20;

    const scrollMargin = 35;

    const styles = {
        width: windowWidth - avatarSize - scrollMargin
    };

    const isSelf = self === userid;
    const textClass = ['text'];
    if(isSelf) {
        textClass.push('self');
    }

    const compoWa   = <WindowAvatar id={avatarId} height={avatarSize} width={avatarSize}/>;
    const compoText = <span className={textClass.join(' ')} style={styles}>
            {text}
        </span>;

    const display = isSelf ? [compoText, compoWa] : [compoWa, compoText];
    const compoDisplay = display.map(
            (data, i) => ({...data, key:i})
        );

    return (
        <div className="windowmessage">
            {compoDisplay}
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
