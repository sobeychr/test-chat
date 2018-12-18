import React from 'react';
import PropTypes from 'prop-types';
import {
    IoMdDesktop,
    IoLogoGoogle,
    IoMdSend
} from 'react-icons/io';

import { isGoogle } from 'Function/windowcontent';

import 'Style/element/window/content/contenthyperlink.scss';

const textLimit = 55;

const ContentHyperlink = ({content}) => {

    let text = content;
    if(text.length > textLimit) {
        text = text.substring(0, textLimit) + '...';
    }
    
    const domainClasses = ['icon', 'domain'];
    let DomainObj = IoMdDesktop;

    if(isGoogle(content)) {
        DomainObj = IoLogoGoogle;
    }

    return (
        <a href={content} target='_blank' className='contenthyperlink'>
            <p>{text}</p>
            <p>
                <DomainObj className='icon domain' />
                <IoMdSend className='icon send' />
            </p>
        </a>
    );
};

export default ContentHyperlink;

ContentHyperlink.defaultProps = {
    content: ''
};
ContentHyperlink.propTypes = {
    content: PropTypes.string
};
