import React from 'react';

import ButtonIconAdd from './buttonicon/buttoniconadd';

import './../../style/element/header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddUser = this.handleAddUser.bind(this);
    }

    handleAddUser() {
        
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
