const path = require('path');
const {dim} = require(path.join("../CSBless", "/helpers", "/matrices.js"));

test('dimension of normal matrix', function() {
    expect(dim("{[1,2,3]|[1,2,3]}")).toEqual([2,3]);
});

test('dimension of matrix with unequally sized rows', function() {
    expect(() => dim("{[1,2,3]|[1,2]}")).toThrow();
});

test('dimension of unformatted matrix', function() {
    expect(() => dim("{1,2,3,1,2,3}")).toThrow();
});

