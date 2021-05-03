const path = require('path');
const {addM} = require(path.join("../CSBless", "/helpers", "/matrices.js"));

test('addition of normal matrces', function() {
    expect(addM(["{[1,2,3]|[1,2,3]}", "{[1,2,3]|[1,2,3]}"])).toEqual([[2,4,6],[2,4,6]]);
});

test('addition of matrices with incompatible dimensions', function() {
    expect(() => addM(["{[1,2,3]|[1,2,3]}","{[1,1]|[2,2]|[3,3]}"])).toThrow();
});

test('addition of matrices with unequal rows', function() {
    expect(() => addM(["{[1,2,3]|[1,2]}", "{[1,2]|[1,2,3]}"])).toThrow();
});

test('addition of unformatted matrices', function() {
    expect(() => addM(["[1,2,3][1,2,3]",'[1,2,3][1,2,3]'])).toThrow();
});