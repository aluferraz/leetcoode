/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function (root, target, k) {
    // debugger;
    if (root === null) return [];
    let result = [];
    let targetNode = findNode(root, null, target)
    distanceKTransverse(targetNode, k, result, 0, new Set());
    return result;
};
function findNode(node, parent, target) {
    if (node === null) return null;
    let result = null;
    if (node.val === target.val) {
        result = node;
    }
    node.parent = parent;
    let leftResult = findNode(node.left, node, target);
    let rightResult = findNode(node.right, node, target);
    if (leftResult !== null)
        result = leftResult;
    if (rightResult !== null)
        result = rightResult;
    return result;
}
function distanceKTransverse(node, k, result, currentK, visited) {
    if (node === null) return;
    if (visited.has(node)) return;
    if (currentK > k) return;
    if (k === currentK) {
        result.push(node.val);
    }
    visited.add(node);
    distanceKTransverse(node.left, k, result, (currentK + 1), visited);
    distanceKTransverse(node.right, k, result, (currentK + 1), visited);
    distanceKTransverse(node.parent, k, result, (currentK + 1), visited);
}

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
let root = new TreeNode(0);
root.left = new TreeNode(1);
root.left.right = new TreeNode(3);
root.left.left = new TreeNode(2);
root.left.left.left = new TreeNode(7);
root.left.left.right = new TreeNode(4);
root.left.left.right.right = new TreeNode(5);
root.right = new TreeNode(6);
distanceK(root, new TreeNode(1), 3);

 // let root = new TreeNode(3);
 // root.left = new TreeNode(5);
 // root.left.left = new TreeNode(6);
 // root.left.right = new TreeNode(2);
 // root.left.right.left = new TreeNode(7);
 // root.left.right.right = new TreeNode(4);
 // root.right = new TreeNode(1);
 // root.right.left = new TreeNode(0);
 // root.right.right = new TreeNode(8);
 // distanceK(root, new TreeNode(5), 2);