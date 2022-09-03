/**
 * @param {number[]} nums
 * @return {number}
 */
var subArrayRanges = function (nums) {
    let stack = [];
    let PLE = Array(nums.length).fill(-1); //PreviousLessElement
    let NLE = Array(nums.length).fill(nums.length); //PreviousLessElement
    for (let i = 0; i < nums.length; i++) {
        const currentEl = nums[i];
        while (stack.length > 0 && stack[stack.length - 1] > currentEl) {
            NLE[stack.pop()] = i;
        }
        stack.push(i);
    }
    for (let i = (nums.length - 1); i >= 0; i--) {
        const currentEl = nums[i];
        while (stack.length > 0 && stack[stack.length - 1] >= currentEl) {
            PLE[stack.pop()] = i;
        }
        stack.push(i);
    }

    debugger;
};

subArrayRanges([1, 2, 3]);