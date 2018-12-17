const extImage = ['jpe?g','png','gif','svg','webp'];
const extVideo = ['gifv','mp4','webm'];

const getExtToRegExp = exts => new RegExp('\\.(' + exts.join('|') + ')((\\?|\\#)\.+)\?$');

export const getExtension = content => {
    const exts   = extImage.concat(extVideo);
    const regexp = getExtToRegExp(exts);
    const result = regexp.exec(content);
    return result === null || result[1] === null
        ? null : result[1];
};

export const isMedia = content => isImage(content) || isVideo(content);

export const isHyperlink = content => /^(https?\:)?\/{2}/.test(content);
export const isImage     = content => getExtToRegExp(extImage).test(content);
export const isVideo     = content => getExtToRegExp(extVideo).test(content);
