const path = require('path');
const {dp} = require(path.join("/CSBless", "/helpers", "/vectors.js"));

test('dot product of natural number vectors', function() {
    expect(dp('[1,0,0]', '[0,0,1]')).toEqual(0);
    expect(dp('[1,2,3]', '[4,5,6]')).toEqual(32);
});

test('dot product of decimal vectors', function() {
    expect(dp('[1.2,.2,5]', '[1,3,5]')).toEqual(26.8);
});

test('dot product of vectors with negatives', function() {
    expect(dp('[-1,1,1]', '[1,-1,1]')).toEqual(-1);
});

test('throws error for maximum length', function() {
    expect(() => dp('[500000000,1,1]', '[1,-1,1]')).toThrow();
});

test('throws error for inconsistently sized vectors', function() {
    expect(() => dp('[1,1,0]', '[1,-1]')).toThrow();
});

test('throws error for unformatted vectors', function() {
    expect(() => dp('1,1,0', '1,1,0')).toThrow();
});