/*
 * @lc app=leetcode id=2096 lang=javascript
 *
 * [2096] Step-By-Step Directions From a Binary Tree Node to Another
 */

// @lc code=start
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
 * @param {number} startValue
 * @param {number} destValue
 * @return {string}
 */
var getDirections = function (root, startValue, destValue) {
    setParents(root);
    let startNode = findNode(root, startValue);
    let endNode = bfs(startNode, destValue);
    return backtrack(endNode, startNode);
};

function backtrack(endNode, startNode) {
    let current = endNode;
    let result = [];
    while (current.val !== startNode.val) {
        result.push(current.path);
        current = current.next;
    }
    return result.reverse().join('');
}

function bfs(starNode, destValue) {
    let queue = new Queue();
    queue.enqueue([starNode, "", null]);
    let visited = new Set();
    visited.add(starNode.val)
    while (queue.size() > 0) {
        let size = queue.size();
        for (let i = 0; i < size; i++) {
            let [node, path, ref] = queue.dequeue();

            node.path = path;
            node.next = ref;
            if (node.val === destValue) {
                return node
            };
            if (node.parent !== null && !visited.has(node.parent.val)) {
                queue.enqueue([node.parent, "U", node]);
                visited.add(node.parent.val);
            }
            if (node.left !== null && !visited.has(node.left.val)) {
                queue.enqueue([node.left, "L", node]);
                visited.add(node.left.val);
            }
            if (node.right !== null && !visited.has(node.right.val)) {
                queue.enqueue([node.right, "R", node]);
                visited.add(node.right.val);
            }
        }
    }
    return null;
}

function findNode(node, val) {
    if (node === null) return null;
    if (node.val === val) return node;
    let result = findNode(node.left, val);
    if (result === null) return findNode(node.right, val);
    return result;
}

function setParents(node, parent = null) {
    if (node === null) return;
    node.parent = parent;
    setParents(node.left, node);
    setParents(node.right, node);
}
// @lc code=end



const { Queue } = require('./IMPORT_CLASSES/node_modules/@datastructures-js/queue');

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

let root;
root = new TreeNode(5);
root.left = new TreeNode(1);
root.left.left = new TreeNode(3);
root.right = new TreeNode(2);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(4);


console.log(getDirections(root, 3, 6));