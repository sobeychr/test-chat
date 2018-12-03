import React from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonIconDrag from './../buttonicon/buttonicondrag';
import WindowAvatar from './windowavatar';
import WindowMessage from './windowmessage';
import { endDrag, fetchMessages } from './../../../reduxStore/actions';

import './../../../style/element/window/windowchat.scss';

class WindowChat extends React.Component {
    constructor(props) {
        super(props);
        this.dragStop = this.dragStop.bind(this);
    }

    componentDidMount() {
        this.props.dispatch( fetchMessages() );
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
                (data, i) => <WindowMessage key={i} {...data}/>
            );

        return (
            <Draggable {...dragConfig}>
                <div className='windowchat' style={styles}>
                    <div className="user">
                            <ButtonIconDrag />
                        <WindowAvatar id={avatar} />
                        <span className="name">{name}</span>
                    </div>
                    <div className="message">
                        {messages}
                    </div>
                </div>
            </Draggable>
        );
    }
}

const mapStateToProp = state => ({
    messageData: state.message
});

export default connect(mapStateToProp)(WindowChat);

WindowChat.defaultProps = {
    id: 0,
    name: "",
    avatar: 0,
    status: 0,
    x: 50,
    y: 50,
    width: 200,
    height: 200
};
WindowChat.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.number,
    status: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
};