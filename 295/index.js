var MedianFinder = function () {
    this.lowers = new MaxHeap();
    this.greaters = new MinHeap();
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
    //Both empty, choose randomly
    debugger;
    if (this.lowers.heap.length === 0 || num < this.lowers.peek()) {
        this.lowers.insert(num);
    } else {
        this.greaters.insert(num);
    }
    this.rebalance();
};
MedianFinder.prototype.rebalance = function () {
    if (this.lowers.heap.length - this.greaters.heap.length === 2)
        this.greaters.insert(this.lowers.remove())
    if (this.greaters.heap.length - this.lowers.heap.length === 2)
        this.lowers.insert(this.greaters.remove())
}
/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
    if (this.lowers.heap.length === this.greaters.heap.length) {
        return (this.lowers.peek() + this.greaters.peek()) / 2;
    } else if (this.lowers.heap.length > this.greaters.heap.length) {
        return this.lowers.peek();
    } else {
        return this.greaters.peek();
    }
};

/** 
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */



class MinHeap {
    //Parent node -> Math.floor((i-1)/2);
    //Child One -> 2i + 1
    //Child Two -> 2i + 2
    constructor() {
        this.heap = [];
    }
    peek() {
        return this.heap[0];
    }
    buildHeap(array) {
        this.heap = array;
        let currentIdx = this.heap.length - 1;
        while (this.hasParent(currentIdx)) {
            this.siftDown(this.getParent(currentIdx));
            currentIdx--;
        }
    }
    getMin() {
        return this.heap[0];
    }
    siftUp() {
        let currentIdx = this.heap.length - 1;
        let parentIdx = this.getParentIdx(currentIdx);
        while (this.hasParent(currentIdx) && this.compare(currentIdx, parentIdx)) {
            this.swap(currentIdx, parentIdx);
            currentIdx = parentIdx;
            parentIdx = this.getParentIdx(currentIdx);
        }
    }
    siftDown(i) {
        let currentIdx = i;
        while (this.hasLeft(currentIdx)) {
            let choosenChildIdx = this.getLeftIdx(currentIdx);
            if (this.hasRight(currentIdx)) {
                choosenChildIdx = this.chooseChildIdx(this.getLeftIdx(currentIdx), this.getRightIdx(currentIdx));
            }
            if (this.compare(choosenChildIdx, currentIdx)) {
                this.swap(choosenChildIdx, currentIdx);
                currentIdx = choosenChildIdx;
            } else {
                break;
            }

        }
    }

    hasParent(i) {
        return Math.floor((i - 1) / 2) >= 0;
    }
    getLeftIdx(i) {
        return ((2 * i) + 1);
    }
    getRightIdx(i) {
        return ((2 * i) + 2);
    }
    hasLeft(i) {
        return ((2 * i) + 1) < this.heap.length;
    }
    hasRight(i) {
        return ((2 * i) + 2) < this.heap.length;
    }
    getParentIdx(i) {
        return Math.floor((i - 1) / 2);
    }
    swap(i, j) {
        let temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
    compare(idx1, idx2) {
        return this.heap[idx1] < this.heap[idx2]
    }
    chooseChildIdx(idx1, idx2) {
        return this.heap[idx1] < this.heap[idx2] ? idx1 : idx2;
    }
    insert(value) {
        this.heap.push(value);
        this.siftUp();
    }
    remove() {
        let result = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.siftDown(0);
        return result;
    }
}

class MaxHeap extends MinHeap {
    compare(idx1, idx2) {
        return this.heap[idx1] > this.heap[idx2];
    }
    chooseChildIdx(idx1, idx2) {
        return this.heap[idx1] > this.heap[idx2] ? idx1 : idx2;
    }
}

let medianFinder = new MedianFinder();

medianFinder.addNum(1);
medianFinder.addNum(2);
console.log(medianFinder.findMedian());
medianFinder.addNum(3);
console.log(medianFinder.findMedian());
medianFinder.addNum(4);
console.log(medianFinder.findMedian());
medianFinder.addNum(5);
console.log(medianFinder.findMedian());


// let medianFinder = new MedianFinder();
// medianFinder.addNum(-1);
// medianFinder.addNum(-2);
// console.log(medianFinder.findMedian());
// medianFinder.addNum(-3);
// console.log(medianFinder.findMedian());
// medianFinder.addNum(-4);
// console.log(medianFinder.findMedian());
// medianFinder.addNum(-5);
// console.log(medianFinder.findMedian());