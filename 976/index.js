/**
 * @param {number[]} nums
 * @return {number}
 */
//a < b + c
var largestPerimeter = function (nums) {
    nums.sort((a, b) => { return b - a });
    for (let i = 2; i < nums.length; i++) {
        let a = nums[i - 2];
        let b = nums[i - 1];
        let c = nums[i];
        if (a < b + c) return a + b + c;
    }
    return 0;
};