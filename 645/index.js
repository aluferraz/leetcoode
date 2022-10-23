/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
    let set = new Set();
    let repeated = null;
    for (let i = 0; i < nums.length; i++) {
        if (set.has(nums[i])) repeated = nums[i];
        set.add(nums[i]);
    }
    for (let i = 1; i <= nums.length; i++) {
        if (!set.has(i)) return [repeated, i];
    }
};

console.log(findErrorNums([3, 2, 2]));