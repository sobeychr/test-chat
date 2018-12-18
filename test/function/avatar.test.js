import * as fc from 'Function/avatar';

// Zero-based index > id, col, row and img
const testAvatars = [
    {
        id:  0,
        exc: 0,
        img: 0,
        row: 0,
        col: 0
    },
    {
        id:  4,
        exc: 4,
        img: 0,
        row: 0,
        col: 4
    },
    {
        id:  25,
        exc: 25,
        img: 0,
        col: 1,
        row: 4
    },
    {
        id:  69,
        exc: 69,
        img: 1,
        col: 3,
        row: 5
    },
    {
        id:  70,
        exc: 72,
        img: 2,
        col: 0,
        row: 0
    },
    {
        id:  71,
        exc: 73,
        img: 2,
        col: 1,
        row: 0
    },
    {
        id:  72,
        exc: 74,
        img: 2,
        col: 2,
        row: 0
    },
    {
        id:  74,
        exc: 76,
        img: 2,
        col: 4,
        row: 0
    },
    {
        id:  75,
        exc: 77,
        img: 2,
        col: 5,
        row: 0
    },
    {
        id:  76,
        exc: 78,
        img: 2,
        col: 0,
        row: 1
    },
    {
        id:  77,
        exc: 79,
        img: 2,
        col: 1,
        row: 1
    },
    {
        id:  103,
        exc: 105,
        img: 2,
        col: 3,
        row: 5
    },
    {
        id:  104,
        exc: 106,
        img: 2,
        col: 4,
        row: 5
    },
    {
        id:  105,
        exc: 107,
        img: 2,
        col: 5,
        row: 5
    },
    {
        id:  106,
        exc: 108,
        img: 3,
        col: 0,
        row: 0
    },
    {
        id:  285,
        exc: 287,
        img: 3,
        col: 0,
        row: 0
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
