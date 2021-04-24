const path = require('path');
const {add} = require(path.join("/CSBless", "/helpers", "/vectors.js"));

test('adding natural number vectors', function() {
    expect(add(['[0,0,0]', '[1,1,1]', '[2,2,2]'])).toEqual([3,3,3]);
});

test('adding decimal vectors', function() {
    expect(add(['[1.2,.2]', '[1,3]'])).toEqual([2.2,3.2]);
});

test('adding vectors with negatives', function() {
    expect(add(['[-1,1]', '[1,-1]'])).toEqual([0,0]);
});

test('throws error for maximum length', function() {
    expect(() => add(['[500000000,1]', '[1,-1]'])).toThrow();
});

test('throws error for unequal vectors', function() {
    expect(() => add(['[1,1]', '[1,-1,0]'])).toThrow();
});

test('throws error for unformatted vectors', function() {
    expect(() => add(['[1,1]', '[x,y,z]'])).toThrow();
});