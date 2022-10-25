/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

class MaxAvg {
    constructor() {
        this.max = -Infinity;
    }
    updateMax(value) {
        this.max = Math.max(this.max, value);
    }
    getMax() {
        return this.max;
    }
}

var maximumAverageSubtree = function (root) {
    if (root === null) return 0;
    let maxAvg = new MaxAvg();
    //let cache = new Map();
    dfs(root, maxAvg);
    return maxAvg.getMax();

};

function dfs(node, maxAvg) {
    //  debugger;
    if (node === null) return [0, 0]; // base case
    // if (cache.has(node)) {
    //     return cache.get(node);
    // }
    const [leftNodeCount, leftNodeSum] = dfs(node.left, maxAvg);
    const [rightNodeCount, rightNodeSum] = dfs(node.right, maxAvg);
    let currentNodeCount = 1 + leftNodeCount + rightNodeCount; // The node itself + left + right
    let currentNodeSum = node.val + leftNodeSum + rightNodeSum;// The node itself + left + right
    //Update the max if needed
    maxAvg.updateMax((currentNodeSum / currentNodeCount));
    const result = [currentNodeCount, currentNodeSum];
    // cache.set(node, result);
    return result;
}

/*
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
let root = new TreeNode(5);
root.left = new TreeNode(6);
root.right = new TreeNode(1);
maximumAverageSubtree(root);
*/