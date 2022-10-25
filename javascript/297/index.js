/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
    let serializeArray = [];
    serializeToArray(root, serializeArray);
    return serializeArray;

};

function serializeToArray(node, array) {
    //PreOrder
    if (node === null) {
        array.push(null)
        return;
    }
    array.push(node.val);
    serializeToArray(node.left, array);
    serializeToArray(node.right, array);
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
class PositionInfo {
    constructor() {
        this.position = 0;
    }
}
var deserialize = function (data) {
    if (data.length === 0) return null;
    let position = new PositionInfo();
    return deserializeArrayInOrder(data, position, null);
};


function deserializeArrayInOrder(data, dataInfo, node) {
    if (dataInfo.position === data.length) return;
    if (data[dataInfo.position] === null) return null;
    let target = node;
    if (node === null) { target = new TreeNode(data[dataInfo.position]); }
    dataInfo.position++;
    target.left = deserializeArrayInOrder(data, dataInfo, target.left);
    dataInfo.position++;
    target.right = deserializeArrayInOrder(data, dataInfo, target.right);
    return target;
}


/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */





///DEBUG


function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.right.left = new TreeNode(4);
root.right.right = new TreeNode(5);
deserialize(serialize(root));