import React from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import { endDrag } from './../../../reduxStore/actions';

import ButtonIconDrag from './../buttonicon/buttonicondrag';
import WindowAvatar from './windowavatar';
import WindowInput from './windowinput';
import WindowMessage from './windowmessage';

import './../../../style/element/window/windowchat.scss';

const userData    = require('./../../../data/user.json');
const userDefault = userData.default;

class WindowChat extends React.Component {
    constructor(props) {
        super(props);
        this.dragStop = this.dragStop.bind(this);
    }

    dragStop(event, data) {
        const { id, x, y } = this.props;
        this.props.dispatch(endDrag(
            id,
            x + data.lastX,
            y + data.lastY
        ));
    }

    render() {
        const {avatar, name, x, y, width, height} = this.props;
        const avatarSize = 40;

        const dragConfig = {
            defaultPosition: {
                x,
                y
            },
            grid: [5, 5],
            handle: '.buttonicondrag',
            onStop: this.dragStop
        };

        const chatStyles = {
            width,
            height
        };
        const messageStyles = {
            height: height - avatarSize - 34
        };

        const messages = this.props.messageData.map(
                (data, i) => <WindowMessage key={i} {...data} windowWidth={width} />
            );

        return (
            <Draggable {...dragConfig}>
                <div className='windowchat' style={chatStyles}>
                    <div className="user">
                            <ButtonIconDrag />
                        <WindowAvatar id={avatar} height={avatarSize} width={avatarSize} />
                        <span className="name">{name}</span>
                    </div>
                    <div className="message" style={messageStyles}>
                        {messages}
                    </div>
                    <WindowInput />
                </div>
            </Draggable>
        );
    }
}

export default connect()(WindowChat);

WindowChat.defaultProps = {...userDefault,
    messageData: []
};
WindowChat.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.number,
    status: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    messageData: PropTypes.array
};
