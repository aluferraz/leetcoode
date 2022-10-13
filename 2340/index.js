/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumSwaps = function (nums) {
    if (nums.length === 0) return 0;
    let [leftMostMinIdx, rightMostMaxIdx] = findTargets(nums);
    let swaps = leftMostMinIdx;
    if (leftMostMinIdx > rightMostMaxIdx) {
        rightMostMaxIdx++;
    }
    swaps += (nums.length - rightMostMaxIdx - 1);
    return swaps;
};

function swap(i, j, arr) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function findTargets(nums) {
    let result = [0, 0];

    for (let i = 0; i < nums.length; i++) {
        let current = nums[i];
        if (current < nums[result[0]]) {
            result[0] = i;
        }
        if (current >= nums[result[1]]) {
            result[1] = i;
        }
    }
    return result;
}

console.log(minimumSwaps([3, 4, 5, 5, 3, 1]))