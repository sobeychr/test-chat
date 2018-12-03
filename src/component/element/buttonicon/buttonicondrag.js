import React from 'react';
import PropTypes from 'prop-types';
import { IoIosKeypad } from 'react-icons/io';

import './../../../style/element/buttonicon/buttonicondrag.scss';

const ButtonIconDrag = () => (
    <button className="buttonicon buttonicondrag">
        <i className="icon">
            <IoIosKeypad />
        </i>
    </button>
);

export default ButtonIconDrag;

ButtonIconDrag.propTypes = {

};