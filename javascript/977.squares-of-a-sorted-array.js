/*
 * @lc app=leetcode id=977 lang=javascript
 *
 * [977] Squares of a Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
    if (nums.length < 2) return [nums[0] * nums[0]];
    let left = 0;
    while (nums[left + 1] < 0) {
        left++;
    }
    let right = left + 1;
    let result = [];
    while (left >= 0 && right < nums.length) {
        if (Math.abs(nums[left]) < Math.abs(nums[right])) {
            result.push(Math.pow(nums[left], 2));
            left--;
        } else {
            result.push(Math.pow(nums[right], 2));
            right++;
        }
    }
    while (left >= 0) {
        result.push(Math.pow(nums[left], 2));
        left--;
    }

    while (right < nums.length) {
        result.push(Math.pow(nums[right], 2));
        right++;
    }
    return result;
};

console.log(sortedSquares([-4, -1, 0, 3, 10]));
// @lc code=end

