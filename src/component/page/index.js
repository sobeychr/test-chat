import React from 'react';
import { connect } from 'react-redux';

import WindowChat from './../element/window/windowchat';
import { init } from './../../reduxStore/actions';

import './../../style/page/index.scss';

class Index extends React.Component {
    componentDidMount() {
        this.props.dispatch( init() );
    }

    render() {
        const messages = this.props.messageData;
        const users = this.props.userData.map(
                (data, i) => <WindowChat key={i} {...data} messageData={messages} />
            );

        return (
            <div className="main">
                {users}
            </div>
        );
    }
}

const mapStateToProp = state => ({
    userData:    state.user,
    messageData: state.message
});

export default connect(mapStateToProp)(Index);
