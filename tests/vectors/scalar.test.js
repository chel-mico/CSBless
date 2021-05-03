const path = require('path');
const {sp} = require(path.join("../CSBless", "/helpers", "/vectors.js"));

test('scalar product of natural number vectors', function() {
    expect(sp(3, '[1,0,0]')).toEqual([3,0,0]);
    expect(sp(4, '[1,2,3]')).toEqual([4,8,12]);
});

test('scalar product of decimal vectors', function() {
    expect(sp(4.5, '[1.2,.2,5]')).toEqual([5.4,0.9,22.5]);
});

test('scalar product of vectors with negatives', function() {
    expect(sp(-1, '[-1,1,1]')).toEqual([1,-1,-1]);
});

test('throws error for maximum length', function() {
    expect(() => sp(3, '[500000000,1,1]')).toThrow();
});

test('throws error for non-number scalars', function() {
    expect(() => sp('e', '[1,-1]')).toThrow();
});

test('throws error for unformatted vectors', function() {
    expect(() => sp(3, '1,1')).toThrow();
});