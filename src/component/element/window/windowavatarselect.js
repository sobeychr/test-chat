import React from 'react';
import PropTypes from 'prop-types';

import 'Style/element/window/windowavatarselect.scss';

import WindowAvatar from './windowavatar';
import * as wa from './windowavatar.func';

const WindowAvatarSelect = ({open, onClose, onSelect}) => {

    const classes = ['windowavatarselect'];
    if(open) {
        classes.push('windowavatarselect--open');
    }

    const size = 40;
    const total = wa.avatarPerImg * wa.avatarData.maxImage;

    const avatarList = [];
    for(let i=0; i<total; i++) {
        avatarList.push(
            <WindowAvatar key={i} id={i} height={size} width={size} onClick={() => onSelect(i)}/>
        );
    }

    return (
        <div className={classes.join(' ')} onClick={onClose}>
            <div className="list">
                {avatarList}
            </div>
        </div>
    );
};

export default WindowAvatarSelect;

WindowAvatarSelect.defaultProps = {
    open: false
};
WindowAvatarSelect.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};
