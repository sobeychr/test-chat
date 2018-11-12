import React from 'react';

import WindowAvatar from './../element/window/windowavatar.js';

import './../../style/page/index.scss';

class Index extends React.Component {
    render() {
        return (
            <div className="main">
                <WindowAvatar id={5} />
            </div>
        );
    }
}

export default Index;
