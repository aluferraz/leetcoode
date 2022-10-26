/*
 * @lc app=leetcode id=523 lang=javascript
 *
 * [523] Continuous Subarray Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function (nums, k) {
    if (nums.length < 2) return false;
    if (k === 0) return true;
    let presum = Array(nums.length).fill(0);
    presum[0] = nums[0] % k;
    for (let i = 1; i < nums.length; i++) {
        presum[i] = (presum[i - 1] + nums[i]) % k;
    }
    let set = new Set();
    for (let i = 1; i < presum.length; i++) {
        let mod = presum[i] % k;
        if (mod === 0) return true;
        if (set.has(mod)) return true;
        if (set.has(presum[i])) return true; //If we can make 0
        set.add(presum[i - 1]);
    }
    return false;
};


var checkSubarraySumDebug = function (nums, k) {
    for (let i = 0; i < nums.length; i++) {
        let sum = nums[i];
        for (let j = i + 1; j < nums.length; j++) {
            sum += nums[j];
            if (sum % k === 0) debugger;
        }
    }
};



console.log(checkSubarraySum(
    [
        422, 224, 184, 178, 189, 290, 196, 236,
        281, 464, 351, 193, 49, 76, 0, 298, 193,
        176, 158, 514, 312, 143, 475, 322, 206, 67,
        524, 424, 76, 99, 473, 256, 364, 292, 141,
        186, 190, 69, 433, 205, 93, 72, 476, 393,
        512, 468, 160, 201, 226, 394, 47, 140, 389,
        51, 142, 135, 349, 244, 16, 356, 440, 188,
        16, 133, 58, 394, 7, 517, 56, 480, 400, 146,
        169, 439, 102, 374, 370, 242, 4, 264, 120, 218,
        196, 173, 215, 411, 501, 321, 319, 147, 369, 458, 319, 174, 379, 46, 129, 353, 330, 101],
    479
));
// @lc code=end

