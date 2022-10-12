/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function (nums) {
    if (nums.length < 3) return false;
    let ple = getPLE(nums);
    let nge = getNGE(nums);
    for (let j = 0; j < nums.length; j++) {
        if (ple[j] !== -1 && nge[j] !== -1) return true;
    }
    return false;
};

function getPLE(nums) {
    let stack = [];
    let pleArray = Array(nums.length).fill(-1);
    for (let i = nums.length - 1; i >= 0; i--) {
        while (stack.length > 0 && nums[i] < nums[stack[stack.length - 1]]) {
            pleArray[stack.pop()] = i;
        }
        stack.push(i);
    }
    return pleArray;
}


function getNGE(nums) {
    let stack = [];
    let nleArray = Array(nums.length).fill(-1);
    for (let i = 0; i < nums.length; i++) {
        while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
            nleArray[stack.pop()] = i;
        }
        stack.push(i);
    }
    return nleArray;
}

console.log(increasingTriplet([1,2,3,4,5]))