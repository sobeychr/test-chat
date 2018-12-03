import React from 'react';
import PropTypes from 'prop-types';

import ButtonIconDrag from './../buttonicon/buttonicondrag';
import WindowAvatar from './windowavatar';

import './../../../style/element/window/windowchat.scss';

const WindowChat = ({name, avatar, status, window}) => {
    const styles = {
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height
    };

    return (
        <div className='windowchat' style={styles}>
            <div className="user">
                <ButtonIconDrag />
                <WindowAvatar id={avatar} />
                <span className="name">{name}</span>
            </div>
            <pre>chat window</pre>
        </div>
    );
};

export default WindowChat;

WindowChat.defaultProps = {
    id: 0,
    name: "",
    avatar: 0,
    status: 0,
    window: {
        x: 50,
        y: 50,
        width: 200,
        height: 200
    }
};
WindowChat.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.number,
    status: PropTypes.number
};