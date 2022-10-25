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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
    return preorder(root, 0, targetSum);
};

function preorder(node, sum, targetSum) {
    if (node === null) return false;
    sum += node.val;
    let isLeaf = node.left === null && node.right === null;
    if (isLeaf && sum === targetSum) return true;
    if (preorder(node.left, sum, targetSum)) {
        return true;
    }
    return preorder(node.right, sum, targetSum);
}