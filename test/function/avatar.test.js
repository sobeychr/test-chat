import * as fc from 'Function/avatar';

// Zero-based index > id, col, row and img
const testAvatars = [
    {
        id:  0,
        col: 0,
        row: 0,
        img: 0,
        exc: 0
    },
    {
        id:  4,
        col: 4,
        row: 0,
        img: 0,
        exc: 4
    },
    {
        id:  25,
        col: 1,
        row: 4,
        img: 0,
        exc: 25
    },
    {
        id:  72,
        col: 2,
        row: 0,
        img: 2,
        exc: 74
    },
    {
        id:  150,
        col: 2,
        row: 1,
        img: 4,
        exc: 152
    }
];

describe('Avatar tests', () => {

    testAvatars.forEach(entry => {
        const {id, col, row, img, exc} = entry;

        test('getImgId - ' + id + ' > ' + img, async() => {
            expect( fc.getImgId(id) ).toBe(img);
        });
        test('getColumn - ' + id + ' > ' + col, async() => {
            expect( fc.getColumn(id) ).toBe(col);
        });
        test('getRow - ' + id + ' > ' + row, async() => {
            expect( fc.getRow(id) ).toBe(row);
        });
        test('getExcludeId - ' + id + ' > ' + exc, async() => {
            expect( fc.getExcludeId(id) ).toBe(exc);
        });
    });
});
