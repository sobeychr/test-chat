import React from 'react';
import { connect } from 'react-redux';

import WindowChat from './../element/window/windowchat';
import { fetchMessages, fetchUsers } from './../../reduxStore/actions';

import './../../style/page/index.scss';

class Index extends React.Component {
    componentDidMount() {
        this.props.dispatch( fetchMessages() );
        this.props.dispatch( fetchUsers() );
    }

    render() {
        const messages = this.props.messageData;
        const users = this.props.userData.map(
                (data, i) => <WindowChat key={i} {...data} message={messages} />
            );

        return (
            <div className="main">
                {users}
            </div>
        );
    }
}

const mapStateToProp = state => ({
    messageData: state.message,
    userData: state.user
});

export default connect(mapStateToProp)(Index);
