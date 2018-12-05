import React from 'react';
import PropTypes from 'prop-types';

import './../../../style/element/window/windowavatar.scss';

const avatarData = require('./../../../data/avatar.json');
const avatarPerImg  = avatarData.avatarColumns * avatarData.avatarRows;

const getImgId = id => Math.floor(id / avatarPerImg)

const getColumn = id => {
    const imgStart = getImgId(id) * avatarPerImg;
    const row      = getRow(id) * avatarData.avatarRows;
    const counter  = id - imgStart - row;
    return counter;
};
const getRow = id => {
    const imgStart = getImgId(id) * avatarPerImg;
    const counter  = id - imgStart;
    return Math.floor(counter / avatarData.avatarRows);
};

const getHeight = (height=avatarData.avatarBaseHeight) => avatarData.avatarRows    * height;
const getWidth  = (width=avatarData.avatarBaseWidth)   => avatarData.avatarColumns * width;

const WindowAvatar = ({id, height, width}) => {

    const classes = [
        'windowavatar',
        'windowavatar' + getImgId(id)
    ];

    const bgHeight = height * avatarData.avatarRows;
    const bgWidth  = width  * avatarData.avatarColumns;

    const styles = {
        height,
        width,
        backgroundSize: bgWidth + 'px ' + bgHeight + 'px',
        backgroundPositionX: -1 * width  * getColumn(id),
        backgroundPositionY: -1 * height * getRow(id)
    };

    return (
        <div className={classes.join(' ')} style={styles}></div>
    );
};

export default WindowAvatar;

WindowAvatar.defaultProps = {
    id: 0,
    height: 25,
    width: 25
};
WindowAvatar.propTypes = {
    id: PropTypes.number.isRequired,
    height: PropTypes.number,
    width: PropTypes.number
};
