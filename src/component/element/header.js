import React from 'react';

import ButtonIconAdd from './buttonicon/buttoniconadd';

import './../../style/element/header.scss';

const Header = () => (
    <header>
        <h1>Test chat</h1>

        <div className="add">
            <ButtonIconAdd label="Add User" />
        </div>
    </header>
);

export default Header;
