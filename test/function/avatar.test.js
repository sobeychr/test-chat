const {...} = require('Function/windowcontent');

test('getExtension - gif', () => {

    expect( getExtension('test.gif') ).toBe('gif');
});
