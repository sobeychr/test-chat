import React from 'react';
import PropTypes from 'prop-types';

import './../../../style/element/window/windowavatar.scss';

const grid = {
    maxColumn: 6,
    maxRow:    6,

    baseHeight: 90,
    baseWidth:  90,

    newHeight: 40,
    newWidth:  40
};

class WindowAvatar extends React.Component {
    getColumn() {
        const imgCount = this.getImg() * this.getMaxGrid(),
              rowCount = this.getRow() * grid.maxRow,
              counter = this.props.id - imgCount - rowCount;
        return counter - 1; // zero-based index
    }
    getImg() {
        return Math.floor(this.props.id / this.getMaxGrid());
    }
    getMaxGrid() {
        return grid.maxColumn * grid.maxRow;
    }
    getRow() {
        const imgCount = this.getImg() * this.getMaxGrid(),
              counter = this.props.id - imgCount;
        return Math.floor(counter / grid.maxRow);
    }

    render() {
        const className = 'windowavatar' + this.getImg(),
              posX = -1 * grid.newWidth  * this.getColumn(),
              posY = -1 * grid.newHeight * this.getRow(),
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