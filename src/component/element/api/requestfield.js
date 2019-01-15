import React from 'react';
import PropTypes from 'prop-types';

import 'Style/element/api/requestfield.scss';

const maxString = 100;

const leadingZero = (value, zeros=2) => {
    var s = value.toString();
    while(s.length < zeros) {
        s = '0' + s;
    }
    return s;
};

const printDate = date => {
    const d = [
        leadingZero(date.getFullYear(), 4),
        leadingZero(date.getMonth()),
        leadingZero(date.getDate())
    ];
    const h = [
        leadingZero(date.getHours(), 2),
        leadingZero(date.getMinutes(), 2),
        leadingZero(date.getSeconds(), 2)
    ];
    return d.join('-') + ' ' + h.join(':');
}

const RequestField = ({label, value}) => {
    const fieldClass = ['request-field'];
    const labelClass = ['request-field__label'];
    var details = false;

    if(Array.isArray(value)) {
        labelClass.push('array');
        label += '(' + value.length + ')';
    }
    else if(isNaN(value)) {
        labelClass.push('string');
        label += '(' + value.length + ')';

        value = value.substring(0, Math.min(maxString, value.length));
    }
    else {
        const date = new Date( value * 1000 );
        
        if(date.getFullYear() > 1970) {
            labelClass.push('date');
            details = <span className='details'>{ printDate(date) }</span>;
        }
        else {
            labelClass.push('number');
        }
    }

    return (
        <p className={fieldClass.join(' ')}>
            <span className={labelClass.join(' ')}>{label}</span>
            <span className='request-field__value'>{value}{details}</span>
        </p>
    );
};

RequestField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string,
            PropTypes.number
        ]).isRequired
};

export default RequestField;
