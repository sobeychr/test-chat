export const avatarData    = require('Data/avatar.json');
export const avatarPerImg  = avatarData.maxColumns * avatarData.maxRows;

export const getExcludeId = id => {
    let newId = id;
    avatarData.exclude.forEach(entry => {
        if(newId >= entry) {
            newId++;
        }
    });
    return newId;
};

export const getImgId = id => Math.floor(getExcludeId(id) / avatarPerImg);

export const getColumn = id => {
    const newId    = getExcludeId(id);
    const imgStart = getImgId(id) * avatarPerImg;
    const row      = getRow(id) * avatarData.maxRows;
    return newId - imgStart - row;
};
export const getRow = id => {
    const newId    = getExcludeId(id);
    const imgStart = getImgId(id) * avatarPerImg;
    const counter  = newId - imgStart;
    return Math.floor(counter / avatarData.maxRows);
};

export const isValid = id => !isNaN(id)
    && id >= 0
    && id < (
        avatarPerImg * avatarData.maxImage
        - avatarData.exclude.length
    );