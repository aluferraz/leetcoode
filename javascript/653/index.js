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
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
    let sortedArray = [];
    inOrder(root, sortedArray);

    let left = 0;
    let right = sortedArray.length - 1;
    while (left < right) {
        let a = sortedArray[left];
        let b = sortedArray[right];
        let sum = (a + b);
        if (sum === k) return true;
        if (sum > k) {
            right--;
        } else {
            left++;
        }
    }
    return false;
};

function inOrder(node, array) {
    if (node === null) return;
    inOrder(node.left, array);
    array.push(node.val);
    inOrder(node.right, array);

}



function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}


let root;
root = new TreeNode(236);
root.left = new TreeNode(104);
root.left.right = new TreeNode(227);
root.right = new TreeNode(701);
root.right.right = new TreeNode(911);
console.log(findTarget(root, 331));