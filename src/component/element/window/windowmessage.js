import React from 'react';
import PropTypes from 'prop-types';

import WindowAvatar from './windowavatar';

import './../../../style/element/window/windowmessage.scss';

const WindowMessage = ({from, text, timestamp}) => {

    
    
    return (
        <div className="windowmessage">
            <WindowAvatar id={from} />
            {text}
        </div>
    );
};

export default WindowMessage;

WindowMessage.defaultProps = {
    from: 0,
    text: "",
    timestamp: 0
};
WindowMessage.propTypes = {
    from: PropTypes.number.isRequired,
    text: PropTypes.string,
    timestamp: PropTypes.number
};
