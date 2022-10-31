/*
 * @lc app=leetcode id=766 lang=javascript
 *
 * [766] Toeplitz Matrix
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
var isToeplitzMatrix = function (matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (isValidIdx(i + 1, j + 1, matrix)
                && matrix[i + 1][j + 1] !== matrix[i][j]) {
                return false;
            }
        }
    }
    return true;
};
function isValidIdx(i, j, matrix) {
    return i < matrix.length && i >= 0 && j < matrix[i].length && j >= 0;
}
// @lc code=end

