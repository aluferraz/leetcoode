/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDifference = function (nums) {
    nums.sort((a, b) => { return a - b });

}


const { MinPriorityQueue, MaxPriorityQueue } = require('../IMPORT_CLASSES/node_modules/@datastructures-js/priority-queue')
const { Queue } = require('../IMPORT_CLASSES/node_modules/@datastructures-js/queue');
console.log(minimumDifference([3, 1, 2]));