export const avatarData    = require('Data/avatar.json');
export const avatarPerImg  = avatarData.maxColumns * avatarData.maxRows;

export const getExcludeId = id => {
    let newId = id;
    avatarData.exclude.forEach(exc => {
        if(newId >= exc) {
            newId++;
        }
    });
    return newId;
};

export const getImgId = id => Math.floor(getExcludeId(id) / avatarPerImg);

export const getColumn = id => {
    const newId    = getExcludeId(id);
    const imgStart = getImgId(newId) * avatarPerImg;
    const row      = getRow(newId) * avatarData.maxRows;
    return newId - imgStart - row;
};
export const getRow = id => {
    const newId    = getExcludeId(id);
    const imgStart = getImgId(newId) * avatarPerImg;
    const counter  = newId - imgStart;
    return Math.floor(counter / avatarData.maxRows);
};
