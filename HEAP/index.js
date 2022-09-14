
class MaxHeap {
    constructor(array) {
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
            if (childTwoIdx !== -1 && heap[childTwoIdx].count > heap[childOneIdx].count) {
                idxToSwap = childTwoIdx;
            } else {
                idxToSwap = childOneIdx;
            }
            if (heap[idxToSwap][1] > heap[currentIdx][1]) {
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
        while (currentIdx > 0 && heap[currentIdx].count > heap[parentIdx].count) {
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

    swap(i, j, heap) {
        this.vertexMap[heap[i][0]] = j;
        this.vertexMap[heap[j][0]] = i;
        const temp = heap[j];
        heap[j] = heap[i];
        heap[i] = temp;
    }

    update(key, value) {
        this.heap[this.vertexMap[key]].value = value;
        this.siftUp(this.vertexMap[key], this.heap);
    }
}