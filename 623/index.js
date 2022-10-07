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
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}
 */
var addOneRow = function (root, val, depth) {
    let queue = new Queue();
    if (depth === 1) {
        let node = new TreeNode(val, root);
        return node;
    }
    queue.enqueue([root, null, 1]);
    let targets = [];
    while (queue.size() > 0) {
        let size = queue.size();
        for (let i = 0; i < size; i++) {
            let [node, parent, level] = queue.dequeue();
            if (level === depth) {
                targets.push([node, parent]);
            }
            if (node === null) continue;
            queue.enqueue([node.left, node, level + 1]);
            queue.enqueue([node.right, node, level + 1]);
        }
        if (targets.length > 0) break;
    }
    while (targets.length > 0) {
        let [child, parent] = targets.pop();
        if (child === parent.left) {
            let leftBkp = parent.left;
            let newLeft = new TreeNode(val);
            newLeft.left = leftBkp;
            parent.left = newLeft;
        } else {
            let rightBkp = parent.right;
            let newRight = new TreeNode(val);
            newRight.right = rightBkp;
            parent.right = newRight;
        }
    }
    return root;

};



function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}


const { Queue } = require('../IMPORT_CLASSES/node_modules/@datastructures-js/queue');
let root = new TreeNode(1);
root.left = new TreeNode(2);
root.left.left = new TreeNode(4);
root.right = new TreeNode(3);
console.log(addOneRow(root, 5, 4));