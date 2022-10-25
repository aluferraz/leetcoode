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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
    return inOrder(root, subRoot);
};

function inOrder(node, subRoot) {
    if (node === null) return false;
    if (node.val === subRoot.val && doubleTransverse(node, subRoot)) {
        return true;
    }
    if (inOrder(node.left, subRoot) === false) {
        return inOrder(node.right, subRoot);
    }
    return true;
}

function doubleTransverse(node1, node2) {
    if (node1 === null || node2 === null) {
        return node1 === node2;
    }
    if (node1.val !== node2.val) return false;
    if ( doubleTransverse(node1.left, node2.left) ){
        return doubleTransverse(node1.right, node2.right);    
    }
    return false;
}