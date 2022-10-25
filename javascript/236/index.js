/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    //Edge cases
    if (p === q) return p;
    if (p === root || q === root) return root;
    //Bfs to find levels
    let [pLevel, qLevel] = bfs(root, p, q); //O(N)

    let [newP, newQ] = evenLevels(pLevel, qLevel, p, q); //O(N)

    while (newP !== newQ) { //O(N)
        newP = newP.parent;
        newQ = newQ.parent;
    }

    return newP;
};

function evenLevels(pLevel, qLevel, p, q) {
    while (pLevel < qLevel) {
        q = q.parent;
        qLevel--;
    }
    while (qLevel < pLevel) {
        p = p.parent;
        pLevel--;
    }
    return [p, q];
}

function bfs(root, p, q) {
    let queue = new Queue();
    queue.enqueue([root, null]);
    let pLevel = 0;
    let qLevel = 0;
    let level = 0;
    while (queue.size() > 0) {
        let size = queue.size();
        sameLevel = new Set();
        for (let i = 0; i < size; i++) {
            let [node, parent] = queue.dequeue();
            node.parent = parent;
            if (node === p) {
                pLevel = level;
            }
            if (node === q) {
                qLevel = level;
            }
            if (qLevel !== 0 && pLevel !== 0) {
                //Found both
                queue.clear();
                break;
            }
            if (node.left !== null) {
                ;
                queue.enqueue([node.left, node]);
            }
            if (node.right !== null) {
                queue.enqueue([node.right, node]);
            }
        }
        level++;
    }
    return [pLevel, qLevel];
}


//DEBUG
const { Queue } = require('../IMPORT_CLASSES/node_modules/@datastructures-js/queue');
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

let root = new TreeNode(3);
root.left = new TreeNode(5);
root.left.left = new TreeNode(6);
root.left.right = new TreeNode(2);
root.left.right.left = new TreeNode(7);
root.left.right.right = new TreeNode(4);
let p = root.left.right.right;

root.right = new TreeNode(1);
root.right.left = new TreeNode(1);
root.right.right = new TreeNode(8);
let q = root.right.right;
lowestCommonAncestor(root, p, q);