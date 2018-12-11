import React from 'react';
import PropTypes from 'prop-types';

import 'Style/element/window/windowavatar.scss';

import * as wa from './windowavatar.func';

const WindowAvatar = ({id, height, width, onClick}) => {
    const classes = [
        'windowavatar',
        'windowavatar' + wa.getImgId(id)
    ];

    const bgHeight = height * wa.avatarData.maxRows;
    const bgWidth  = width  * wa.avatarData.maxColumns;

    const styles = {
        height,
        width,
        backgroundSize: bgWidth + 'px ' + bgHeight + 'px',
        backgroundPositionX: -1 * width  * wa.getColumn(id),
        backgroundPositionY: -1 * height * wa.getRow(id)
    };

    let binds = {};
    if(onClick) {
        binds = {...binds, onClick};
    }

    return (
        <div className={classes.join(' ')} style={styles} {...binds}></div>
    );
};

export default WindowAvatar;

WindowAvatar.defaultProps = {
    id: 0,
    height: wa.avatarData.height,
    width: wa.avatarData.width,
    onClick: null
};
WindowAvatar.propTypes = {
    id: PropTypes.number.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
    onClick: PropTypes.func
};
