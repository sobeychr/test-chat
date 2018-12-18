import React from 'react';
import PropTypes from 'prop-types';

const ContentVideo = ({content}) => {
    
    return (
        <span>{content}</span>
    );
};

export default ContentVideo;

ContentVideo.defaultProps = {
    content: ''
};
ContentVideo.propTypes = {
    content: PropTypes.string
};
