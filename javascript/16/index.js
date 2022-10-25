/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    nums.sort((a, b) => { return a - b });
    let distance = [Infinity, null];
    for (let i = 0; i < nums.length - 2; i++) {
        let pivot = nums[i];
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            let sum = pivot + nums[left] + nums[right];
            if (sum === target) return sum;

            let curDistance = Math.abs(target - sum);
            if (curDistance < distance[0]) {
                distance[0] = curDistance;
                distance[1] = sum;
            }
            if (sum > target) {
                right--;
            }
            if (sum < target) {
                left++;
            }
        }
    }
    return distance[1];

};

console.log(threeSumClosest([-1, 2, 1, -4], 1));