/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */


var kSum = function (nums, k) {
    let maxSum = 0;
    nums = nums.map((el) => {
        if (el > 0) maxSum += el;
        return Math.abs(el)
    });
    nums.sort((a, b) => { return a - b });
    let maximumSumQueue = new MaxPriorityQueue();
    maximumSumQueue.enqueue([(maxSum - nums[0]), 0], (maxSum - nums[0]));

    for (let i = 1; i < k; i++) {
        let [sum, idx] = maximumSumQueue.dequeue().element;
        if (idx + 1 < nums.length) {
            let nextSum = sum - nums[idx + 1];
            let nextIgnoringCurrent = sum - nums[idx + 1] + nums[idx];
            maximumSumQueue.enqueue([nextSum, idx + 1], nextSum);
            maximumSumQueue.enqueue([nextIgnoringCurrent, idx + 1], nextIgnoringCurrent);
        }
        
        maxSum = sum;

    }
    return maxSum;
};


const { MaxPriorityQueue } = require('../IMPORT_CLASSES/node_modules/@datastructures-js/priority-queue')


console.log(kSum([1,-2,3,4,-10,12],16))