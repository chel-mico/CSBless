const parseVector = function(size, x) {
    const check = /\[[0-9-.,]+[0-9-.]*\]/; //regex for array form of floats
    const v = "" + x;
    if (check.test(v)) { //checks arg against the regex
        vector = v.substring(1, v.length - 1).split(','); //parses the numbers into an array
        if (vector.length != size && size > 0) { //runs if one of the vectors isn't the right size
            throw "Error: one of the vectors is not of the right size.";
        }
        for (let i = 0; i < size; i++) {
            vector[i] = parseFloat(vector[i]);
        }
    } else { //runs if one of the args isn't formatted right
        throw "Error: one of the vectors is invalid.";
    }
    return vector;
}

exports.dp = function(v1, v2) {
    const vector1 = parseVector(0, v1);
    const vector2 = parseVector(vector1.length, v2);
    let x = 0;
    for (let i = 0; i < vector1.length; i++) {
        x = x + (vector1[i] * vector2[i]);
    }
    return {v1, v2, x};
}

exports.cp = function(v1, v2) {
    const vector1 = parseVector(3, v1);
    const vector2 = parseVector(3, v2);
    let x = [];
    for (let i = 0; i < 3; i++) {
        const index1 = (i + 1) % 3;
        const index2 = (i + 2) % 3;
        x[i] = (vector1[index1] * vector2[index2]) + (vector1[index2] * vector2[index1]);
    }
    return {v1, v2, x};
}