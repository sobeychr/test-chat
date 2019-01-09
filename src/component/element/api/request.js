import React from 'react';
import PropTypes from 'prop-types';

import 'Style/element/api/request.scss';

const Request = ({end, error, json, start, query}) => {
    const delay = end - start;

    const titleClass = error ? 'success' : 'error';

    return (
        <article className="request">
            <h1 className="title">
                <span className={titleClass}>REQUEST</span>
                <span className="query">{query}</span>
            </h1>
            <p className="delay">
                <span className="int">{delay}</span> ms
            </p>
        </article>
    );
};

export default Request;

Request.propTypes = {
    end: PropTypes.number.isRequired,
    error: PropTypes.bool,
    json: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ]).isRequired,
    query: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired
};
Request.defaultProps = {
    error: false
};