import React from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import ButtonIconDrag from './../buttonicon/buttonicondrag';
import WindowAvatar from './windowavatar';
import WindowInput from './windowinput';
import WindowMessage from './windowmessage';
import { endDrag } from './../../../reduxStore/actions';

import './../../../style/element/window/windowchat.scss';

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

        const styles = {
            width,
            height
        };

        const messages = this.props.messageData.map(
                (data, i) => <WindowMessage key={i} {...data} />
            );

        return (
            <Draggable {...dragConfig}>
                <div className='windowchat' style={styles}>
                    <div className="user">
                            <ButtonIconDrag />
                        <WindowAvatar id={avatar} height={avatarSize} width={avatarSize} />
                        <span className="name">{name}</span>
                    </div>
                    <div className="message">
                        {messages}
                    </div>
                    <WindowInput />
                </div>
            </Draggable>
        );
    }
}

export default connect()(WindowChat);

WindowChat.defaultProps = {
    id: 0,
    name: "",
    avatar: 0,
    status: 0,
    x: 50,
    y: 50,
    width: 200,
    height: 200,
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
