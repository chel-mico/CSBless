const path = require('path');
const vectors = require(path.join('/CSBless', "/helpers", "/vectors.js"));

//TODO: finish parse_matrix, dim and add_matrices

/**
 * Function to parse a matrix from a string.
 * 
 * @param {*} m The matrix to be parsed.
 * @returns The matrix as a double array of floats.
 */
function parse_matrix(m) {
    const check = /\{(\[[0-9-.,]+[0-9-.]*\]\|)+(\[[0-9-.,]+[0-9-.]*\])*\}/ //regex for double array of floats
    if (check.test(m)) { //checks arg against the regex
        let size = 0;
        matrix = m.substring(1, m.length - 1).split('|').map(row => { //parses the numbers into an array
            if (size === 0) {
                row = vectors.parse(row);
                size = row.length;
            } else {
                row = vectors.parse(row, size);
            }
            return row;
        });
    } else { //runs if matrix is not fotmatted properly
        throw new Error("Error: one of the matrices is invalid.");
    }
    return matrix;
}

/**
 * Function to return the dimensions of a matrix.
 * 
 * @param {string} m The matrix who's dimension is to be calculated.
 * @returns Height of the matrix (int), length of the matrix (int).
 */
const dimension = function(m) {
    matrix = parse_matrix(m);
    return [matrix.length, matrix[0].length];
}

/**
 * Function to add a set of matrices.
 * 
 * @param {array[string]} m The set of matrices to be added.
 * @returns The matrix addition.
 */
const add_matrices = function(m) {
    return '';
}

module.exports = {
    dim: dimension,
    addM: add_matrices
}