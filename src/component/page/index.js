import React from 'react';

import WindowChat from './../element/window/windowchat.js';

import './../../style/page/index.scss';

// const userData = require('./../../data/user.json');
const userData = [];

class Index extends React.Component {
    render() {
        const users = userData.map(
                (data, i) => <WindowChat key={i} {...data}/>
            );

        //{users}
        return (
            <div className="main">
                
            </div>
        );
    }
}

export default Index;
