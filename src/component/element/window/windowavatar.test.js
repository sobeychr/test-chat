
const sum = require('./calc');

test('add 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

/*
import React from 'react';
import renderer from 'react-test-renderer';
import WindowAvatar from './windowavatar';

test('testing WindowAvatar', () => {
    const component = renderer.create(<WindowAvatar id={0}/>);
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();

    expect(component.getColumn()).toBe(0);
});
*/