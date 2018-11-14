import React from 'react';

import WindowAvatar from './../element/window/windowavatar.js';

import './../../style/page/index.scss';

class Index extends React.Component {
    render() {
        const avatars = Array.from(
                {length: 6*6*6},
                (_, i) => <WindowAvatar key={i} id={i} />
            );

        return (
            <div className="main">
                {avatars}
            </div>
        );
    }
}

export default Index;
