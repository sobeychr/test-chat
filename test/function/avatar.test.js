import * as fc from 'Function/windowcontent';

test('getExtension - gif', () => {

    expect( fc.getExtension('test.gif') ).toBe('gif');
});
