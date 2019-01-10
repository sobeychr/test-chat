import React from 'react';
import PropTypes from 'prop-types';

import { renderFields } from './request';
import RequestField from './requestfield';

import 'Style/element/api/requestentry.scss';

const RequestEntry = ({data}) => {
    var fields = renderFields(data);

    return (
        <div className='request-entry'>
            {fields}
        </div>
    );
};

RequestEntry.propTypes = {
    data: PropTypes.object.isRequired
};

export default RequestEntry;
