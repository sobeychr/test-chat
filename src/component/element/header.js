import React from 'react';

import ButtonIconAdd from './buttonicon/buttoniconadd';
import { newUser } from './../../redux/actions';

import './../../style/element/header.scss';

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
        newUser(un);
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

export default Header;
