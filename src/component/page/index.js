import React from 'react';
import { connect } from 'react-redux';

import store from 'ReduxStore';
import { init, newUser } from 'ReduxStore/actions';

import ButtonIconAdd from 'Element/buttonicon/buttoniconadd';
import WindowChat from 'Element/window/windowchat';

import 'Style/page/index.scss';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        };
        
        this.handleUsername   = this.handleUsername.bind(this);
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
    }

    componentDidMount() {
        this.props.dispatch( init() );
    }

    handleUsername(event) {
        this.setState({
            username: event.target.value
        });
    }

    handleUserSubmit(event) {
        event.preventDefault();
        const un = this.state.username;

        if(un.length > 0) {
            this.props.dispatch( newUser(un) );
        }
    }

    render() {
        const messages = this.props.message;
        const users    = this.props.user.map(
                (data, i) => <WindowChat key={i} {...data} messageData={messages} />
            );

        return (
            <div className="main">
                <form className="add" onSubmit={this.handleUserSubmit}>
                    <ButtonIconAdd label="Add User" type="submit"/>
                    <input type="text" placeholder="New username" value={this.state.username} onChange={this.handleUsername} />
                </form>

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
