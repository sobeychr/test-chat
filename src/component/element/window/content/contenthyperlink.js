import React from 'react';
import PropTypes from 'prop-types';
import { IoMdDesktop, IoMdSend } from 'react-icons/io';
import {
    IoLogoDropbox,
    IoLogoFacebook,
    IoLogoFlickr,
    IoLogoGithub,
    IoLogoGoogle,
    IoLogoInstagram,
    IoLogoLinkedin,
    IoLogoNodejs,
    IoLogoNpm,
    IoLogoReddit,
    IoLogoSteam,
    IoLogoTwitch,
    IoLogoTwitter,
    IoLogoVimeo,
    IoLogoYoutube
} from 'react-icons/io';

import { getDomain } from 'Function/windowcontent';

import 'Style/element/window/content/contenthyperlink.scss';

const domainIcons = {
    dropbox:  IoLogoDropbox,
    facebook: IoLogoFacebook,
    flickr:   IoLogoFlickr,
    git:       IoLogoGithub,
    google:    IoLogoGoogle,
    instagram: IoLogoInstagram,
    linkedin: IoLogoLinkedin,
    node:     IoLogoNodejs,
    npm:      IoLogoNpm,
    reddit: IoLogoReddit,
    steam:  IoLogoSteam,
    twitch: IoLogoTwitch,
    twitter: IoLogoTwitter,
    video:   IoLogoVimeo,
    youtube: IoLogoYoutube
};
const textLimit = 55;

const ContentHyperlink = ({content}) => {

    let text = content;
    if(text.length > textLimit) {
        text = text.substring(0, textLimit) + '...';
    }
    
    let DomainImg = false;
    let DomainObj = IoMdDesktop;

    const domain = getDomain(content);
    if(domain) {
        if(domain.image) {
            DomainObj = false;

            const src = require('Image/contenthyperlink/' + domain.image);
            DomainImg = <img className='icon domain' src={src} />;
        }
        else {
            DomainObj = domainIcons[domain.name];
        }
    }

    if(DomainObj) {
        DomainObj = <DomainObj className='icon domain' />;
    }

    return (
        <a href={content} target='_blank' className='contenthyperlink'>
            <p>{text}</p>
            <p>
                { DomainImg ? DomainImg : DomainObj }
                <IoMdSend className='icon send' />
            </p>
        </a>
    );
};

export default ContentHyperlink;

ContentHyperlink.defaultProps = {
    content: ''
}
;ContentHyperlink.propTypes = {
    content: PropTypes.string
};
