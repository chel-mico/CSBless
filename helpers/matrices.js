const path = require('path');
const vectors = require(path.resolve(process.cwd(), "./helpers/vectors.js"));

/**
 * Function to check whether or not a matrix is square
 * 
 * @param {array[float]} m The matrix.
 * @returns True if the matrix is square, false otherwise.
 */
function is_square(m) {
    const dim = dimension(m);
    if (dim[0] === dim[1]) {
        return true;
    }
    return false;
}

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
    const dim = dimension(matrix);
    if (dim[0] > 5 || dim[1] > 5) { //size cap at 5x5
        throw "Error: matrix is too large. Maximum size is 5x5";
    }
    return matrix;
}

/**
 * Function to return a string representation of a matrix.
 * 
 * @param {array[number]} m The matrix.
 * @returns A string representation of the matrix.
 */
const to_string = function(m) {
    return '\n' + m.map(row => {
        let s = '[  ';
        for (let i = 0; i < row.length; i++) {
            s += row[i] + "  ";
        }
        s += ']';
        return s;
    }).join('\n'); //maps each row and joins then together with newlines
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
                final_matrix[j][k] = vectors.round(final_matrix[j][k] + matrices[i][j][k]);
                vectors.safe(final_matrix[j][k])
            }
        }
    }
    return final_matrix;
}

/**
 * Function to multiply a set of compatable matrices in order of appearence.
 * 
 * @param {array[string]} m The array of matrix strings.
 * @returns The matrix multiplication.
 */
const multiplication = function(m){
    let dimensions = [], final_matrix = [];
    const matrices = [];
    for (let i = 0; i < m.length; i++) {
        matrices[i] = parse_matrix(m[i]);
        if (dimensions.length === 0) {
            dimensions = dimension(matrices[i]);
            final_matrix = matrices[i];
        } else {
            let dim = dimension(matrices[i]);
            if (dim[1] !== dimensions[0]) {
                throw "Error: two or more vectors are not the same size.";
            }
            const temp = transpose(matrices[i]);
            const new_matrix = [];
            for (let j = 0; j < final_matrix.length; j++) {
                if (!new_matrix[j]) {
                    new_matrix[j] = [];
                }
                for (let k = 0; k < temp.length; k++) {
                    new_matrix[j][k] = vectors.dp(temp[k], final_matrix[j]);
                }
            }
            final_matrix = new_matrix;
            dimensions = dimension(final_matrix);
        }
    }
    return final_matrix;
}

/**
 * Function to transpose a matrix string.
 * 
 * @param {string} m The matrix to be transposed.
 * @returns The transposed matrix.
 */
const transpose = function(m) {
    let matrix;
    if (typeof m === 'string') {
        matrix = parse_matrix(m);
    } else { //for use as a helper function
        matrix = m;
    }
    let result = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (!result[j]) {
                result[j] = []; //initialize row
            }
            result[j][i] = matrix[i][j]; //turns rows of original matrix into columns of the new matrix
        }
    }
    return result;
}

/**
 * Function to calculate the determinant of a matrix.
 * 
 * @param {string} m The matrix who's determinant is to be calculated.
 * @returns The determinant or 'undefined' if the determinant does not exist.
 */
const determinant = function(m) {
    let matrix;
    if (typeof m === 'string') {
        matrix = parse_matrix(m);
    }
    if (!is_square(matrix)) {
        return "undefined (non-square matrix)";
    }
    //use an additional function and recursion to calculate the determinant
    function solve(matrix, mul) {
        let width = matrix.length;
        if (width === 1) {
            return matrix[0][0] * mul;
        } else {
            let sign = -1;
            let result = 0;
            for (let i = 0; i < width; i++) {
                let m = [];
                for (let j = 1; j < width; j++) {
                    let buffer = [];
                    for (let k = 0; k < width; k++) {
                        if (k !== i) {
                            buffer.push(matrix[j][k]);
                        }
                    }
                    m.push(buffer);
                }
                sign *= -1;
                result += vectors.round(mul * solve(m, matrix[0][i]*sign));
                vectors.safe(result);
            }
            return result;
        }
    }
    return solve(matrix,1)
}

const trace = function(m) {
    let matrix = parse_matrix(m);
    if (!is_square(matrix)) {
        throw new Error('Error: matrix must be square.');
    }
    let trace = 1;
    for (let i = 0; i < matrix.length; i++) {
        trace = vectors.round(trace * matrix[i][i]);
    }
    return trace;
}

const ref = function(m) {
    //TODO: finish
}

module.exports = {
    dim: dimension,
    addM: add_matrices,
    str: to_string,
    mult: multiplication,
    transpose: transpose,
    det: determinant,
    tr: trace
}