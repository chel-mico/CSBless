const path = require('path');
const {dim} = require(path.join("/CSBless", "/helpers", "/matrices.js"));

test('adding natural number vectors', function() {
    expect(dim("{[1,2,3]|[1,2,3]}")).toEqual([2,3]);
});

