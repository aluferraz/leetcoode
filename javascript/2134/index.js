/**
 * @param {number[]} nums
 * @return {number}
 */
var minSwaps = function (nums) {
    let totalOfOnes = 0;
    for (let i = 0; i < nums.length; i++) {
        totalOfOnes += nums[i];
    }
    //We need to find a subarray of length totalOfOnes
    //with the maximum ones together.
    //Once we found it, we swap the zeros

    let left = 0;
    let right = 0;
    const windowSize = totalOfOnes;
    let currentOnesInWindow = 0;
    let maximumOnesInWindow = 0;
    while (right < nums.length) {
        const currentNumber = nums[right];
        currentOnesInWindow += currentNumber;
        if ((right - left) === windowSize) {
            currentOnesInWindow -= nums[left];
            left++;
        }
        maximumOnesInWindow = Math.max(maximumOnesInWindow, currentOnesInWindow);
        right++;
    }
    return totalOfOnes - maximumOnesInWindow;
};