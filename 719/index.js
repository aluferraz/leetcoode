/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
//O(NlogN + NLog(D)) ==> (N (1+logD)) t
// space = o(1)
var smallestDistancePair = function (nums, k) {
    nums.sort((a, b) => { return a - b }); //NlogN
    let maxDiff = nums[nums.length - 1] - nums[0];


    let left = 0;
    let right = maxDiff;
    //O(log(maxDiff) * N)
    while (left < right) {
        let middle = Math.floor(((left + right) / 2));
        let numberOfPairsLessEqThanMid = getPairsBetween(nums, middle)
        if (numberOfPairsLessEqThanMid < k) left = middle + 1;
        else right = middle;
    }
    return left;

};
//O(N)
function getPairsBetween(nums, middle) {
    let total = 0;
    let i, j = 0;
    j = 1;
    for (i = 0; i < nums.length; i++) {
        //Sliding window
        for (j; j < nums.length && Math.abs(nums[i] - nums[j]) <= middle; j++) {
        }
        total += (j - i - 1);
    }
    return total;
}