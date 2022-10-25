/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
class MinHeap {
    constructor(array) {
        this.heap = [];
        if (!!array) this.buildHeap(array);
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
    size() {
        return this.heap.length;
    }
}



var minMeetingRooms = function (intervals) {
    const heap = new MinHeap();
    let usedRooms = 0;
    intervals.sort((a, b) => { return a[0] - b[0] }); //Sort by starting time
    for (let i = 0; i < intervals.length; i++) {
        const currentMeeting = intervals[i];
        const startingTime = currentMeeting[0];
        const endingTime = currentMeeting[1];
     //   debugger;
        //se ninguem tá usando a sala mais
        if (heap.size() === 0) {
            heap.insert(endingTime);
            usedRooms++;
            continue;
        }
        //Sala já tá livre
        if (heap.peek() <= startingTime) {
            heap.remove();
            heap.insert(endingTime);
        }
        //Sala tá ocupada
        else {
            usedRooms++;
            heap.insert(endingTime)
        }
    }
    return usedRooms;
};
