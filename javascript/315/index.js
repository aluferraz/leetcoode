
//Preciso saber, no momento da criacao
var countSmaller = function (nums) {
    let BST = new BinarySearchTree();
    let result = Array(nums.length).fill(0);
    for (let i = nums.length - 1; i >= 0; i--) {
        BST.insert(new Node(nums[i]), result, i);
    }
    return result;
};


class SegmentTree {
    constructor(array) {
        this.segtree = Array(array.length).fill(0).concat(array);
        this.n = array.length;
        for (i = n - 1; i >= 0; i--) {
            segtree
        }
    }
}


console.log(countSmaller([1, 9, 7, 8, 5]));