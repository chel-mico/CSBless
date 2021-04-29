const path = require('path');
const {proj} = require(path.join("../CSBless", "/helpers", "/vectors.js"));

test('projection of natural number vectors', function() {
    expect(proj('[1,0,0]', '[0,0,1]')).toEqual([0,0,0]);
    expect(proj('[1,2,3]', '[4,5,6]')).toEqual([2.3,4.6,6.9]);
});

test('projection of decimal vectors', function() {
    expect(proj('[1.2,.2,5]','[1,3,5]')).toEqual([1.2,0.2,5.1]);
});

test('projection of vectors with negatives', function() {
    expect(proj('[-1,1,1]','[1,1,-1]')).toEqual([0.3,-0.3,-0.3]);
});

test('throws error for maximum length', function() {
    expect(() => proj('[500000000,1,1]')).toThrow();
});

test('throws error for inconsistently sized vectors', function() {
    expect(() => proj('[1,1]', '[1,-1,3]')).toThrow();
});

test('throws error for unformatted vectors', function() {
    expect(() => proj('1,1', '2,4')).toThrow();
});