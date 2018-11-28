import React from 'react';
import { connect } from 'react-redux';

import ButtonIconAdd from './buttonicon/buttoniconadd';
import { newUser } from './../../redux/useraction';

import './../../style/element/header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddUser = this.handleAddUser.bind(this);
    }

    handleAddUser() {
        //this.props.store.dispatch(newUser());
    }

    render() {
        return (
            <header>
                <h1>Test chat</h1>
                <div className="add">
                    <ButtonIconAdd label="Add User" onClick={this.handleAddUser}/>
                </div>
            </header>
        );
    }
};

export default Header;
