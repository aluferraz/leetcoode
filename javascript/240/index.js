/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    if (matrix.length === 0) return 0;

    let col = matrix[0].length - 1;
    let row = 0;

    while (col >= 0 && row < matrix.length) {
        let number = matrix[row][col];
        if (number === target) return true;
        else if (target > number) {
            row++; // Must be bellow
            if (row < matrix.length && ((matrix[row].length) !== matrix[row - 1].length)) {
                col = matrix[row].length - 1; //We need to start from the right
            }
        }
        else col--;
    }

    return false;

};

console.log(searchMatrix(
    [
        [1, 4, 7, 11, 15],
        [2, 5, 8, 12, 19],
        [3, 6, 9, 16, 22],
        [10, 13, 14, 17, 24],
        [18, 21, 23, 26, 30]],
    5
));