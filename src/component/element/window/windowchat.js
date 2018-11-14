import React from 'react';
import PropTypes from 'prop-types';

import './../../../style/element/window/windowchat.scss';

const WindowChat = ({name, avatar, status, window}) => {
    const styles = {
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height
    };

    return (
        <div className="windowchat" style={styles}>
            <p className="name">{name}</p>
            <pre>chat window</pre>
        </div>
    );
};

/*
class WindowChat extends React.Component {
    render() {
        return (
            <div className="windowchat">
                
            </div>
        );
    }
}
*/

export default WindowChat;

WindowChat.defaultProps = {
    name: "",
    avatar: 0,
    status: 0,
    "window": {
        x: 50,
        y: 50,
        width: 200,
        height: 200
    }
};
WindowChat.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.number,
    status: PropTypes.number
};