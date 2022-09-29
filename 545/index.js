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
 * @return {number[]}
 */
var boundaryOfBinaryTree = function (root) {
    if (root === null) return [];
    let result = [root.val];
    let leftBoundaries = getLeftBoundaries(root);
    let rightBoundaries = getRightBoundaries(root);
    let leafNodes = [];
    if (root.left !== null || root.right !== null) getLeafNodes(root, leafNodes);
    return result.concat(leftBoundaries, leafNodes, rightBoundaries);

};

function getLeafNodes(node, result) {
    if (node === null) return;
    if (node.left === null && node.right === null) return result.push(node.val);
    getLeafNodes(node.left, result);
    getLeafNodes(node.right, result);
}

function getLeftBoundaries(root) {
    let result = [];
    getBoundaries(root.left, "left", "right", result);
    return result;
}

function getRightBoundaries(root) {
    let result = [];
    getBoundaries(root.right, "right", "left", result);
    return result.reverse();
}

function getBoundaries(node, direction, alternativeDirection, result) {
    if (node === null) return;
    if (node.left === null && node.right === null) return; //Leaf nodes
    result.push(node.val);
    if (node[direction] !== null) return getBoundaries(node[direction], direction, alternativeDirection, result);
    else return getBoundaries(node[alternativeDirection], direction, alternativeDirection, result);

}