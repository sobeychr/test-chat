import React from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import { endDrag, newAvatar } from './../../../reduxStore/actions';

import ButtonIconDrag from './../buttonicon/buttonicondrag';
import WindowAvatar from './windowavatar';
import WindowAvatarSelect from './windowavatarselect';
import WindowInput from './windowinput';
import WindowMessage from './windowmessage';

import './../../../style/element/window/windowchat.scss';

const userData    = require('./../../../data/user.json');
const userDefault = userData.default;

class WindowChat extends React.Component {
    constructor(props) {
        super(props);
        this.onAvatarClose  = this.onAvatarClose.bind(this);
        this.onAvatarOpen   = this.onAvatarOpen.bind(this);
        this.onAvatarSelect = this.onAvatarSelect.bind(this);
        this.onDragStop = this.onDragStop.bind(this);

        this.state = {
            avatarOpen: false
        };
    }

    onAvatarClose() {
        this.setState({
            avatarOpen: false
        });
    }

    onAvatarOpen() {
        this.setState({
            avatarOpen: true
        });
    }

    onAvatarSelect(avatar) {
        const { id } = this.props;
        this.props.dispatch(newAvatar(
            id,
            avatar
        ));
    }

    onDragStop(event, data) {
        const { id, x, y } = this.props;
        this.props.dispatch(endDrag(
            id,
            x + data.lastX,
            y + data.lastY
        ));
    }

    render() {
        const {avatar, name, x, y, width, height, id} = this.props;
        const avatarSize = 40;

        const dragConfig = {
            bounds: {
                left: 0,
                right: 1500,
                top: 0,
                bottom: 800
            },
            defaultPosition: {
                x,
                y
            },
            grid: [5, 5],
            handle: '.buttonicondrag',
            onStop: this.onDragStop
        };

        const chatStyles = {
            width,
            height
        };
        const messageStyles = {
            height: height - avatarSize - 49
        };

        const messages = this.props.messageData.map(
                (data, i) => <WindowMessage key={i} {...data} self={id} windowWidth={width} />
            );

        return (
            <Draggable {...dragConfig}>
                <div className='windowchat' style={chatStyles}>
                    <div className="user">
                            <ButtonIconDrag />
                        <WindowAvatar id={avatar} height={avatarSize} width={avatarSize} onClick={this.onAvatarOpen} />
                        <span className="name">{name}</span>
                    </div>
                    <div className="message" style={messageStyles}>
                        {messages}
                    </div>
                    <WindowInput id={id} />
                    <WindowAvatarSelect open={this.state.avatarOpen} onClose={this.onAvatarClose} onSelect={this.onAvatarSelect}/>
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
