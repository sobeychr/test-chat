import React from 'react';
import PropTypes from 'prop-types';

import { getExtension, isImage } from 'Function/windowcontent';

import 'Style/element/window/windowmedia.scss';

const renderPicture = content => {
    const ext = 'type/' + getExtension(content);
    return (
        <picture>
            <source src={content} type={ext}/>
            <img src={content}/>
        </picture>
    );
};

const renderVideo = content => {
    const ext = 'type/' + getExtension(content);
    return (
        <video controls loop muted preload="auto" webkit-playsinline="true">
            <source src={content} type={ext}/>
        </video>
    );
};

const WindowMedia = ({content}) => {

    const output = isImage(content)
        ? renderPicture(content)
        : renderVideo(content);

    return (
        <div className="windowmedia">
            {output}
        </div>
    );
};

export default WindowMedia;

WindowMedia.defaultProps = {
};
WindowMedia.propTypes = {
    content: PropTypes.string.isRequired
};
