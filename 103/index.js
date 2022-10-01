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
 * @return {number[][]}
 */
const LTR = 1; //Left to right
const RTL = -1; //Right to Left
var zigzagLevelOrder = function (root) {
    let queue = new Queue();
    let result = [];
    if (root === null) return result;
    queue.enqueue(root);
    let direction = RTL;
    while (queue.size() !== 0) {
        let size = queue.size();
        let row = [];
        for (let i = 0; i < size; i++) {
            let node = queue.dequeue();
            row.push(node.val);
            queueNodes(node.left, node.right, queue);
        }
        direction *= -1;
        if (direction < 0) row.reverse(); //o(2)
        result.push(row);
    }
    return result;
};
function queueNodes(a, b, queue) {
    if (a !== null) {
        queue.enqueue(a);
    }
    if (b !== null) {
        queue.enqueue(b);
    }
}


const { Queue } = require('../IMPORT_CLASSES/node_modules/@datastructures-js/queue');


function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
let root = new TreeNode(1)
root.left = new TreeNode(2)
root.left.left = new TreeNode(4)
root.right = new TreeNode(3)
root.right.right = new TreeNode(5)

zigzagLevelOrder(root)