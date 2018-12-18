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

// https://goo.gl/maps/vJyszajmkL62
// https://www.google.com/maps/@45.498387,-73.6591645,3a,75y,209.13h,90t/data=!3m5!1e1!3m3!1szYQhRFrM3EV15D33954zCA!2e0!6s%2F%2Fgeo2.ggpht.com%2Fcbk%3Fpanoid%3DzYQhRFrM3EV15D33954zCA%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D201.34%26pitch%3D0%26thumbfov%3D100
export const isGoogle = content => /\/{2}(w{3}\.)?(google\.(a-z){2,3}|goo\.gl)\//.test(content);