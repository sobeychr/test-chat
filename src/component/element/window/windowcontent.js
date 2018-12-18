import React from 'react';
import PropTypes from 'prop-types';

import { isHyperlink, isImage, isVideo } from 'Function/windowcontent';
import { ContentHyperlink } from './content';
import WindowMedia from './windowmedia';

import 'Style/element/window/windowcontent.scss';

const WindowContent = ({content, isSelf, width}) => {
    
    const classes = ['windowcontent'];
    if(isSelf) {
        classes.push('windowcontent-self');
    }
    const style = {width};

    let output = content;
    if(isHyperlink(content)) {
        output = <ContentHyperlink content={content} />;
    }

    return (
        <div className={classes.join(' ')} style={style}>
            {output}
        </div>
    );
};

export default WindowContent;

WindowContent.defaultProps = {
    isSelf: false,
    width: 200
};
WindowContent.propTypes = {
    content: PropTypes.string.isRequired,
    isSelf: PropTypes.bool,
    width: PropTypes.number
};
