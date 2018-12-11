import React from 'react';
import { connect } from 'react-redux';

import ButtonIconAdd from './buttonicon/buttoniconadd';
import { newUser } from 'ReduxStore/actions';

import 'Style/element/header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        };
        
        this.handleUsername   = this.handleUsername.bind(this);
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
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
        return (
            <header>
                <h1>Test chat</h1>
                <form className="add" onSubmit={this.handleUserSubmit}>
                    <ButtonIconAdd label="Add User" type="submit"/>
                    <input type="text" placeholder="New username" value={this.state.username} onChange={this.handleUsername} />
                </form>
            </header>
        );
    }
};

const mapStateToProp = state => ({
    username: state.username
});

export default connect(mapStateToProp)(Header);
