const path = require('path');
const {length} = require(path.join("../CSBless", "/helpers", "/vectors.js"));

test('length of natural number vectors', function() {
    expect(length('[1,0,0]')).toEqual(1);
    expect(length('[1,2,3]')).toEqual(3.7);
});

test('length of decimal vectors', function() {
    expect(length('[1.2,.2,5]')).toEqual(5.1);
});

test('length of vectors with negatives', function() {
    expect(length('[-1,1,1]')).toEqual(1.7);
});

test('throws error for maximum length', function() {
    expect(() => length('[500000000,1,1]')).toThrow();
});

test('throws error for unformatted vectors', function() {
    expect(() => length('1,1')).toThrow();
});