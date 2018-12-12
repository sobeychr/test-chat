export const avatarData    = require('Data/avatar.json');
export const avatarPerImg  = avatarData.maxColumns * avatarData.maxRows;

export const getColor = id => avatarData.color[ getImgId(id) ];

export const getImgId = id => Math.floor(id / avatarPerImg);

export const getColumn = id => {
    const imgStart = getImgId(id) * avatarPerImg;
    const row      = getRow(id) * avatarData.maxRows;
    const counter  = id - imgStart - row;
    return counter;
};
export const getRow = id => {
    const imgStart = getImgId(id) * avatarPerImg;
    const counter  = id - imgStart;
    return Math.floor(counter / avatarData.maxRows);
};
