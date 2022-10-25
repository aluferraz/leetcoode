/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
    let pq = new MinPriorityQueue();
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) pq.enqueue(nums[i], nums[i]);
    }
    let cummulative = 0;
    let passes = 0;
    while (pq.size() > 0) {
        let current = pq.dequeue().element - cummulative;
        if ((current) > 0) {
            cummulative += current;
            passes++;
        }
    }
    return passes;
};

const { MinPriorityQueue } = require('../IMPORT_CLASSES/node_modules/@datastructures-js/priority-queue')

console.log(minimumOperations([1,2,3,5]));


