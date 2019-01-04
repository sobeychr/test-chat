import React from 'react';
import { connect } from 'react-redux';

import store from 'ReduxStore';
import { init } from 'ReduxStore/actions';

import WindowChat from './../element/window/windowchat';

import 'Style/page/index.scss';

class Index extends React.Component {
    componentDidMount() {
        this.props.dispatch( init() );
    }

    render() {
        const messages = this.props.message;
        const users    = this.props.user.map(
                (data, i) => <WindowChat key={i} {...data} messageData={messages} />
            );

        console.log('msg', messages);

        return (
            <div className="main">
                {users}
            </div>
        );
    }
}

const mapStateToProp = state => ({
    user:    state.user.list,
    message: state.message.list
});

export default connect(mapStateToProp)(Index);
