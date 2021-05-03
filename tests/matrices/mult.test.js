const path = require('path');
const {mult} = require(path.join("../CSBless", "/helpers", "/matrices.js"));

test('multiplication of normal matrces', function() {
    expect(mult(["{[1,2,3]|[1,2,3]}","{[1,1]|[2,2]|[3,3]}"])).toEqual([[14,14],[14,14]]);
});

test('multiplication of matrices with incompatible dimensions', function() {
    expect(() => mult(["{[1,2,3]|[1,2,3]}", "{[1,2,3]|[1,2,3]}"])).toThrow();
});

test('multiplication of matrices with unequal rows', function() {
    expect(() => mult(["{[1,2,3]|[1,2]}", "{[1,2]|[1,2,3]}"])).toThrow();
});

test('multiplication of unformatted matrices', function() {
    expect(() => mult(["[1,2,3][1,2,3]",'[1,2,3][1,2,3]'])).toThrow();
});