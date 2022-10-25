//T:O(NlogN) S: O(N)


class MinHeap {
    constructor(array) {
        this.heap = [];
        this.buildHeap(array);
    }

    buildHeap(array) {
        let self = this;
        this.heap = array;
        let currentIdx = array.length - 1;
        while (this.hasParent(currentIdx)) {
            let parentIdx = this.getParentIdx(currentIdx);
            this.siftDown(parentIdx);
            currentIdx = currentIdx - 1;
        }

    }
    getParentIdx(i) {
        return (Math.floor((i - 1) / 2));
    }
    getLeftChildIdx(i) {
        return (2 * i + 1);
    }
    getRightChildIdx(i) {
        return (2 * i + 2);
    }
    hasParent(i) {
        return (Math.floor((i - 1) / 2)) >= 0;
    }

    hasLeft(i) {
        return (2 * i + 1) < this.heap.length;
    }
    hasRight(i) {
        return (2 * i + 2) < this.heap.length;
    }

    siftDown(currentIdx) {

        while (this.hasLeft(currentIdx)) {
            let leftIdx = this.getLeftChildIdx(currentIdx);
            let smallestChildIdx = leftIdx;
            if (this.hasRight(currentIdx)) {
                let rightIdx = this.getRightChildIdx(currentIdx);
                if (this.heap[rightIdx] < this.heap[leftIdx]) {
                    smallestChildIdx = rightIdx;
                }
            }
            if (this.heap[smallestChildIdx] < this.heap[currentIdx]) {
                this.swap(currentIdx, smallestChildIdx, this.heap);
            } else {
                break;
            }
            currentIdx = smallestChildIdx;
        }
    }

    siftUp() {
        let currentIdx = this.heap.length - 1;
        while (this.hasParent(currentIdx)) {
            let parentIdx = this.getParentIdx(currentIdx);
            if (this.heap[parentIdx] > this.heap[currentIdx]) {
                this.swap(currentIdx, parentIdx, this.heap);
            } else {
                break;
            }
            currentIdx = parentIdx;
        }
    }

    peek() {
        // Write your code here.
        return this.heap[0];
    }

    remove() {
        let result = this.peek();
        let siftCandidate = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = siftCandidate;
            this.siftDown(0);
        }
        return result;
    }

    insert(value) {
        this.heap.push(value);
        this.siftUp();
    }

    swap(i, j, heap) {
        let temp = heap[j];
        heap[j] = heap[i];
        heap[i] = temp;
    }
    size(){
        return this.heap.length;
    }
}


var connectSticks = function (sticks) {
    const heap = new MinHeap(sticks);// logN
    // debugger;
    //heap.build(sticks); 
    let totalCost = 0;
    while (heap.size() > 1) { //N
        let num1 = heap.remove(); //Logn
        let num2 = heap.remove(); //Logn
        let partialCost = num1 + num2;
        totalCost += partialCost;
        heap.insert(partialCost); //logN
    }
    return totalCost;

};

connectSticks([1175, 8967, 1382, 8748, 8612, 7067, 5979, 8237, 9691, 389, 5801, 7387, 8620, 6674, 1610, 7444, 6969, 970, 9463, 7727, 5044, 1834, 3426, 3192, 9473, 2300, 3647, 6492, 3166, 3486, 454, 6077, 670, 4929, 1266, 8288, 8554, 8432, 4724, 8553, 2442, 1776, 2704, 1276, 2933, 3376, 8259, 8548, 1563, 3884])