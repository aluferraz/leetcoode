/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
    let stack = [];
    let NGE = Array(nums.length).fill(-1); //Next greater element
   // debugger;
    for (let j = 0; j < (nums.length * 2); j++) {
        const currentIdx = j % nums.length;
        while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[currentIdx]) {
            let stackPos = stack.pop();
            NGE[stackPos] = nums[currentIdx];
        }
        if(j < nums.length) stack.push(currentIdx)
    }
    return NGE;
};

nextGreaterElements([5, 4, 3, 2, 1]);