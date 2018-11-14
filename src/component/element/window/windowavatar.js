import React from 'react';
import PropTypes from 'prop-types';

import './../../../style/element/window/windowavatar.scss';

const avatarData = require('./../../../data/avatar.json');

class WindowAvatar extends React.Component {
    getColumn() {
        const imgCount = this.getImg() * this.getMaxavatarData(),
              rowCount = this.getRow() * avatarData.rows,
              counter = this.props.id - imgCount - rowCount;
        return counter;
    }
    getImg() {
        return Math.floor(this.props.id / this.getMaxavatarData());
    }
    getMaxavatarData() {
        return avatarData.columns * avatarData.rows;
    }
    getRow() {
        const imgCount = this.getImg() * this.getMaxavatarData(),
              counter = this.props.id - imgCount;
        return Math.floor(counter / avatarData.rows);
    }

    render() {
        const className = 'windowavatar' + this.getImg(),
              posX = -1 * avatarData.newWidth  * this.getColumn(),
              posY = -1 * avatarData.newHeight * this.getRow(),
              style = {
                backgroundPosition: posX + 'px ' + posY + 'px'
              };

        return (
            <div className={'windowavatar ' + className} style={style}></div>
        );
    }
}

export default WindowAvatar;

WindowAvatar.defaultProps = {
    id: 0
};
WindowAvatar.propTypes = {
    id: PropTypes.number.isRequired
};