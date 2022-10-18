/**
 * @param {number[]} nums
 * @return {number[]}
 */
class Node {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
        this.leftTotal = 0;

    }
}
class BinarySearchTree {
    constructor(root = null) {
        this.root = root;
    }
    insert(node, result, i) {
        if (this.root === null) {
            this.root = node;
            return [node, 0];
        }
        return this.insertHelper(this.root, node, 0, result, i)
    }
    insertHelper(current, node, parentTotal, result, i) {
        if (current === null) {
            result[i] = parentTotal;
            return node;
        }
        if (node.val < current.val) {
            let newNode = this.insertHelper(current.left, node, (parentTotal), result, i);
            current.leftTotal++;
            if (current.left === null) current.left = newNode;
            return current.left;
        } else if (node.val > current.val) {
            let newNode = this.insertHelper(current.right, node, (1 + current.leftTotal + parentTotal), result, i);
            if (current.right === null) current.right = newNode;
            return current.right;
        } else {
            let newNode = this.insertHelper(current.right, node, (current.leftTotal + parentTotal), result, i);
            if (current.right === null) current.right = newNode;
            return current.right;
        }
    }
}
//Preciso saber, no momento da criacao
var countSmaller = function (nums) {
    let BST = new BinarySearchTree();
    let result = Array(nums.length).fill(0);
    for (let i = nums.length - 1; i >= 0; i--) {
        BST.insert(new Node(nums[i]), result, i);
    }
    return result;
};


console.log(countSmaller([1, 9, 7, 8, 5]));