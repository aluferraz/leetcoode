/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDifference = function (nums) {
    let minHeap = new MinPriorityQueue();
    let maxHeap = new MaxPriorityQueue();
    let n = nums.length / 3;

    let min_sum_track = [];
    let max_sum_track = [];

    let min_sum = 0;
    for (let i = 0; i < n; i++) {
        min_sum += nums[i];
        maxHeap.enqueue(nums[i], nums[i]);
    }
    min_sum_track.push(min_sum);

    for (let i = n; i < (2 * n); i++) {
        let candidate = nums[i];
        let biggestNumInSum = maxHeap.front().element;
        if (candidate < biggestNumInSum) {
            maxHeap.dequeue();
            min_sum -= biggestNumInSum;
            min_sum += candidate;
            maxHeap.enqueue(candidate, candidate);
        }
        min_sum_track.push(min_sum);
    }


    let max_sum = 0;
    for (let i = nums.length - 1; i > (nums.length - 1 - n); i--) {
        max_sum += nums[i];
        minHeap.enqueue(nums[i], nums[i]);
    }
    max_sum_track.push(max_sum);
    for (let i = (nums.length - 1 - n); i >= n; i--) {
        let candidate = nums[i];
        let smallestNumInSum = minHeap.front().element;
        if (candidate > smallestNumInSum) {
            minHeap.dequeue();
            max_sum -= smallestNumInSum;
            max_sum += candidate;
            minHeap.enqueue(candidate, candidate);
        }
        max_sum_track.push(max_sum);
    }
    max_sum_track.reverse();
    let result = Infinity;
    for (let i = 0; i < min_sum_track.length; i++) {
        result = Math.min(result, (min_sum_track[i] - max_sum_track[i]))
    }
    return result;
}


const { MinPriorityQueue, MaxPriorityQueue } = require('../IMPORT_CLASSES/node_modules/@datastructures-js/priority-queue')
console.log(minimumDifference([16, 46, 43, 41, 42, 14, 36, 49, 50, 28, 38, 25, 17, 5, 18, 11, 14, 21, 23, 39, 23])); 