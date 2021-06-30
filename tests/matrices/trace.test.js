const path = require('path');
const {tr} = require(path.join("../CSBless", "/helpers", "/matrices.js"));

test('trace of normal matrix', function() {
    expect(tr("{[1,2,3]|[1,2,3]|[1,2,3]}")).toEqual(6);
});

test('transpose of matrix with unequal rows', function() {
    expect(() => tr("{[1,2,3]|[1,2]}")).toThrow();
});

test('transpose of unformatted matrix', function() {
    expect(() => tr("[1,2,3][1,2,3]")).toThrow();
});