/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
//T: O(N * logk) / S: O(N)
var maxSlidingWindowLogN = function (nums, k) {
    if (k === 0 || nums.length === 0) return [];
    let maxHeap = new MaxHeap(); //K Space
    //First we find the max in the window
    for (let i = 0; i < k; i++) {
        //O(k * logk) T
        maxHeap.insert({
            key: i,
            value: nums[i]
        });
    }

    let result = []; // O(N)
    //Edge case, k ===  nums.length
    let currentMax = maxHeap.peek();
    result.push(currentMax.value);
    let leftWindowPos = 0;
    maxHeap.update(leftWindowPos, -Infinity, "DOWN");// We can do this, because if k === 0 we return [],
    //so the following loop will never start at 0.
    //O(K*logK)
    leftWindowPos++;
    for (let i = k; i < nums.length; i++) {
        maxHeap.insert(
            {
                key: i,
                value: nums[i]
            }
        );
        currentMax = maxHeap.peek();
        result.push(currentMax.value);
        //Before increnting i, we update the left element of the window to -Infinity
        maxHeap.update(leftWindowPos, -Infinity, "DOWN");
        leftWindowPos++;

    }
    return result;

};



class MaxHeap {
    constructor(array) {
        if (array === undefined || array.length === 0) {
            this.heap = [];
            this.vertexMap = {};
            return;
        }
        // Holds the position in the heap that each vertex is at
        this.vertexMap = array.reduce((obj, node, i) => {
            obj[node.key] = i;
            return obj;
        }, {});
        this.heap = this.buildHeap(array);
    }

    isEmpty() {
        return this.heap.length == 0;
    }

    // O(n) time | O(1) space
    buildHeap(array) {
        const firstParentIdx = Math.floor((array.length - 2) / 2);
        for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
            this.siftDown(currentIdx, array.length - 1, array);
        }
        return array;
    }

    // O(log(n)) time | O(1) space
    siftDown(currentIdx, endIdx, heap) {
        let childOneIdx = currentIdx * 2 + 1;
        while (childOneIdx <= endIdx) {
            const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
            let idxToSwap;
            if (childTwoIdx !== -1 && heap[childTwoIdx].value > heap[childOneIdx].value) {
                idxToSwap = childTwoIdx;
            } else {
                idxToSwap = childOneIdx;
            }
            if (heap[idxToSwap].value > heap[currentIdx].value) {
                this.swap(currentIdx, idxToSwap, heap);
                currentIdx = idxToSwap;
                childOneIdx = currentIdx * 2 + 1;
            } else {
                return;
            }
        }
    }

    // O(log(n)) time | O(1) space
    siftUp(currentIdx, heap) {
        let parentIdx = Math.floor((currentIdx - 1) / 2);
        while (currentIdx > 0 && heap[currentIdx].value > heap[parentIdx].value) {
            this.swap(currentIdx, parentIdx, heap);
            currentIdx = parentIdx;
            parentIdx = Math.floor((currentIdx - 1) / 2);
        }
    }

    // O(log(n)) time | O(1) space
    remove() {
        if (this.isEmpty()) return;

        this.swap(0, this.heap.length - 1, this.heap);
        const node = this.heap.pop();
        delete this.vertexMap[node.key];
        this.siftDown(0, this.heap.length - 1, this.heap);
        return node;
    }
    insert(obj) {
        this.heap.push(obj);
        let newValueIdx = this.heap.length - 1;
        this.vertexMap[obj.key] = newValueIdx;
        this.siftUp(newValueIdx, this.heap);
    }

    swap(i, j, heap) {
        this.vertexMap[heap[i].key] = j;
        this.vertexMap[heap[j].key] = i;
        const temp = heap[j];
        heap[j] = heap[i];
        heap[i] = temp;
    }

    update(key, value, upDown) {
        this.heap[this.vertexMap[key]].value = value;
        if (upDown === undefined || upDown === "UP")
            this.siftUp(this.vertexMap[key], this.heap);
        else {
            this.siftDown(this.vertexMap[key], (this.heap.length - 1), this.heap);
        }
    }
    peek() {
        return this.heap[0];
    }
}
maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)