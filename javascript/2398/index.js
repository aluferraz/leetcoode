/**
 * @param {number[]} chargeTimes
 * @param {number[]} runningCosts
 * @param {number} budget
 * @return {number}
 */
var maximumRobots = function (chargeTimes, runningCosts, budget) {
    let chargeSegmentTree = new SegmentTree(chargeTimes);
    let runningCostsPrefixSum = buildPrefixSum(runningCosts);
    let left = 0;
    let right = 0;
    let maxK = 0;
    while (right < runningCosts.length) {
        let maxCharge = chargeSegmentTree.getMax(left, right + 1);
        let k = ((right + 1) - left);
        let sum = runningCostsPrefixSum[right] - (left - 1 < 0 ? 0 : runningCostsPrefixSum[left - 1]);
        let totalCost = maxCharge + (k * sum);
        if (totalCost <= budget) {
            maxK = Math.max(maxK, k);
            right++;
        } else {
            left++;
            if (left > right) {
                right = left;
            }
        }

    }
    return maxK;
};

function buildPrefixSum(arr) {
    let prefixSum = Array(arr.length).fill(0);
    prefixSum[0] = arr[0];
    for (let i = 1; i < arr.length; i++) {
        prefixSum[i] = prefixSum[i - 1] + arr[i];
    }
    return prefixSum;
}

class SegmentTree {
    constructor(array) {
        let n = array.length;
        this.segtree = Array(array.length).fill(0).concat(array);
        for (let i = n - 1; i >= 0; i--) {
            this.segtree[i] = Math.max(this.segtree[2 * i], this.segtree[(2 * i) + 1]);
        }
        this.n = n;
    }

    getMax(from, to) {
        from += this.n;
        to += this.n;
        let result = -Infinity;
        while (from < to) {
            if (from % 2 === 1) {
                result = Math.max(result, this.segtree[from]);
                from++;
            }
            if (to % 2 === 1) {
                to--;
                result = Math.max(result, this.segtree[to]);
            }
            from = from / 2;
            to = to / 2;
        }
        return result;
    }
}


console.log(maximumRobots([10, 6, 1, 3, 4],
    [1, 1, 1, 1, 1],
    24))