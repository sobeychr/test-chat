import * as fc from 'Function/windowcontent';

const extImage   = ['jpg','jpeg','png','gif','svg','webp'];
const extVideo   = ['gifv','mp4','webm'];
const extInvalid = ['doc', 'exe', 'gitignore'];

const query = '?param=2175&test=w9ouevb&isbdv_=iaouvb-_92efg';
const hash  = '#lisufdbv20-+=0f';

const exts  = []
    .concat(extImage)
    .concat(extVideo)
    .concat(extInvalid);
const paths = [
    'test.',
    'http://test.',
    'https://alpha/test.',
    '//domain.test-vm/test.'
];
const queries = [
    '',
    query,
    hash,
    query + hash,
    hash + query
];

describe('WindowContent tests', () => {
    exts.forEach(tExt => {
        paths.forEach(tPath => {
            queries.forEach(tQuery => {

                const url = tPath + tExt + tQuery;
                const isInvalid = extInvalid.indexOf(tExt) >= 0;
                const isLink = tPath.indexOf('//') >= 0;

                test('getExtension - ' + tExt + ', "' + url + '"', async() => {
                    if(isInvalid) {
                        expect( fc.getExtension(url) ).toBeNull();
                    }
                    else {
                        expect( fc.getExtension(url) ).toBe(tExt);
                    }
                });

                test('isMedia - ' + tExt + ', "' + url + '"', async() => {
                    if(isInvalid) {
                        expect( fc.isMedia(url) ).toBeFalsy();
                    }
                    else {
                        expect( fc.isMedia(url) ).toBeTruthy();   
                    }
                });

                test('isHyperlink - ' + tExt + ', "' + url + '"', async() => {
                    if(isLink) {
                        expect( fc.isHyperlink(url) ).toBeTruthy();
                    }
                    else {
                        expect( fc.isHyperlink(url) ).toBeFalsy();   
                    }
                });
            });
        });
    });
});
