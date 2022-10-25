/**
 * @param {number[]} nums
 * @return {number}
 */
//O(N^2)  t/s
// var triangularSum = function (nums) {
//     if (nums.length === 1) return nums[0];
//     let newNums = Array(nums.length - 1);
//     for (let i = 0; i < nums.length - 1; i++) {
//         newNums[i] = ((nums[i] + nums[i + 1]) % 10);
//     }
//     return triangularSum(newNums);
// };



/**
 * [1,2,3,4,5]
 * [3,5,7,9]
 * [8,2,6]
 * [0,8]
 * [8]
 */
//O(N^2) / O(1)
var triangularSum = function (nums) {
    for (let i = nums.length; i >= 0; i--) {
        for (let j = 1; j < i; j++) {
            nums[j - 1] = ((nums[j - 1] + nums[j]) % 10);
        }
    }
    return nums[0];
};
console.log(triangularSum([1, 2, 3, 4, 5]))