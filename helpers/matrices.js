const path = require('path');
const vectors = require(path.resolve(process.cwd(), "./helpers/vectors.js"));

//TODO: finish parse_matrix, dim and add_matrices

/**
 * Function to parse a matrix from a string.
 * 
 * @param {string} m The matrix to be parsed.
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

const to_string = function(m) {
    let str = '\n' + m.map(row => {
        let s = '[  ';
        for (let i = 0; i < row.length; i++) {
            s += row[i] + "  ";
        }
        s += ']'
        return s;
    }).join('\n');
    return str;
}

/**
 * Function to return the dimensions of a matrix.
 * 
 * @param {string} m The matrix who's dimension is to be calculated.
 * @returns Height of the matrix (int), length of the matrix (int).
 */
const dimension = function(m) {
    if (typeof m === 'string') {
        matrix = parse_matrix(m);
    }
    return [matrix.length, matrix[0].length];
}

/**
 * Function to add a set of matrices.
 * 
 * @param {array[string]} m The set of matrices to be added.
 * @returns The matrix addition.
 */
const add_matrices = function(m) {
    let dimensions = [];
    const matrices = [];
    for (let i = 0; i < m.length; i++) {
        console.log(m[i]);
        matrices[i] = parse_matrix(m[i]);
        if (dimensions.length === 0) {
            dimensions = dimension(matrices[i]);
        } else {
            let dim = dimension(matrices[i]);
            if (dim[0] !== dimensions[0] || dim[1] !== dimensions[1]) {
                throw "Error: two or more vectors are not the same size.";
            }
        }
    }
    let final_matrix = matrices[0];
    for (let i = 1; i < matrices.length; i++) {
        for (let j = 0; j < dimensions[0]; j++) {
            for (let k = 0; k < dimensions[1]; k++) {
                final_matrix[j][k] += matrices[i][j][k];
            }
        }
    }
    return final_matrix;
}

module.exports = {
    dim: dimension,
    addM: add_matrices,
    str: to_string
}