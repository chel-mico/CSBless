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
    return [[0,0],[0,0]];
}

/**
 * Function to return the dimensions of a matrix.
 * 
 * @param {string} m The matrix who's dimension is to be calculated.
 * @returns Height of the matrix, length of the matrix.
 */
const dimension = function(m) {
    return 1,2;
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