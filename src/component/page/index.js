import React from 'react';

import WindowChat from './../element/window/windowchat.js';

import './../../style/page/index.scss';

const userData = require('./../../data/user.json');

class Index extends React.Component {
    render() {
        /*
        const avatars = Array.from(
                {length: 6*6*6},
                (_, i) => <WindowAvatar key={i} id={i} />
            );

        return (
            <div className="main">
                {avatars}
            </div>
        );
        */
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
