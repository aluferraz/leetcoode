/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var partitionArray = function (nums, k) {
    if (nums.length === 0) return 0;

    nums.sort((a, b) => { return a - b }); //I can do this because it is a subsequence not a subarray NLOGN
    let left = 0;
    let right = nums.length - 1;
    let partitions = 0;
    //if(nums[right] - nums[left] <= k) return 0; // Edge case
    if (k === 0) {
        let set = new Set(nums);
        return set.size;
    }
    while (left <= (nums.length - 1)) {
        left = partitionArrayHelper(nums, k, left, right); //Seems more, but is o(N)
        partitions++;
    }
    return partitions;
};

function partitionArrayHelper(nums, k, left, right) {
    let diff = Infinity;
    while (right > left) {
        let bigger = nums[right];
        let smaller = nums[left];
        diff = bigger - smaller;
        if (diff <= k) return right + 1; // New Left
        right--;
    }
    return left + 1;


}

console.log(partitionArray([0], 0))