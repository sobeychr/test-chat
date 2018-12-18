import React from 'react';
import PropTypes from 'prop-types';

const ContentImage = ({content}) => {
    
    return (
        <span>{content}</span>
    );
};

export default ContentImage;

ContentImage.defaultProps = {
    content: ''
};
ContentImage.propTypes = {
    content: PropTypes.string
};
