const path = require('path');
const {cp} = require(path.join("/CSBless", "/helpers", "/vectors.js"));

test('cross product of natural number vectors', function() {
    expect(cp('[1,0,0]', '[0,0,1]')).toEqual([0,-1,0]);
    expect(cp('[1,2,3]', '[4,5,6]')).toEqual([-3,6,-3]);
});

test('cross product of decimal vectors', function() {
    expect(cp('[1.2,.2,5]', '[1,3,5]')).toEqual([-14,-1,3.4]);
});

test('cross product of vectors with negatives', function() {
    expect(cp('[-1,1,1]', '[1,-1,1]')).toEqual([2,2,0]);
});

test('throws error for maximum length', function() {
    expect(() => cp('[500000000,1,1]', '[1,-1,1]')).toThrow();
});

test('throws error for incorrectly sized vectors', function() {
    expect(() => cp('[1,1]', '[1,-1]')).toThrow();
});

test('throws error for unformatted vectors', function() {
    expect(() => cp('[1,1]', '[x,y,z]')).toThrow();
});