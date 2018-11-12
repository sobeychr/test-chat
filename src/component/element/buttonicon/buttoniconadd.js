import React from 'react';
import PropTypes from 'prop-types';
import { IoIosAddCircleOutline, IoIosAddCircle } from 'react-icons/io';

import './../../../style/element/buttonicon/buttoniconadd.scss';

const ButtonIconAdd = ({label}) => (
    <button className="buttonicon buttoniconadd">
        <i className="icon">
            <IoIosAddCircleOutline className="out"/>
            <IoIosAddCircle className="hover"/>
        </i>
        {label}
    </button>
);

export default ButtonIconAdd;

ButtonIconAdd.propTypes = {
    label: PropTypes.string.isRequired
};