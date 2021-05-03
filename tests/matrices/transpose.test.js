const path = require('path');
const {transpose} = require(path.join("../CSBless", "/helpers", "/matrices.js"));

test('transpose of normal matrix', function() {
    expect(transpose("{[1,2,3]|[1,2,3]}")).toEqual([[1,1],[2,2],[3,3]]);
});

test('transpose of matrix with unequal rows', function() {
    expect(() => trasnpose("{[1,2,3]|[1,2]}")).toThrow();
});

test('transpose of unformatted matrix', function() {
    expect(() => transpose("[1,2,3][1,2,3]")).toThrow();
});