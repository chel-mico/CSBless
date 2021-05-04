const path = require('path');
//const {det} = require(path.join("../CSBless", "/helpers", "/matrices.js")); //This works as well
const {det} = require(path.resolve(process.cwd(), "./helpers/matrices.js"));

test('determinant of a 2x2 matrix', function() {
    expect(det("{[1,2]|[3,4]}")).toEqual(-2);
});

test('determinant of a 5x5 matrix', function() {
    expect(det("{[1,2,0,2,6]|[-5,3,1,9,11]|[1,6,1,2,1]|[0,1,1,-1,1]|[10,4,-6,7,-7]}")).toEqual(-880);
});

test('determinant of a non square matrix', function() {
    expect(det("{[1,2,3]|[1,2,3]}")).toEqual("undefined (non-square matrix)");
});

test('determinant of matrix with unequally sized rows', function() {
    expect(() => det("{[1,2,3]|[1,2]}")).toThrow();
});

test('determinant of an unformatted matrix', function() {
    expect(() => det("{1,2,3,1,2,3}")).toThrow();
});