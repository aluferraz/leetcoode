/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function (words, k) {

    let freqCount = {};
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (!(word in freqCount)) {
            freqCount[word] = {
                freq: 0,
                word: word
            };
        }
        freqCount[word].freq++;
    }
    let arrayOfFreq = [];
    for (let word in freqCount) {
        arrayOfFreq.push(freqCount[word]);
    }
    let maxHeap = new Heap(MAX_HEAP, arrayOfFreq);
    let result = [];
    for (let i = 0; i < k; i++) {
        if (maxHeap.size() === 0) break;
        result.push(maxHeap.remove().word)
    }
    return result;

};

const MAX_HEAP = function (a, b) {
    if (a.freq === b.freq) return a.word < b.word;
    return a.freq > b.freq
}


class Heap {
    constructor(compare, array) {
        this.fn = compare;
        if (array === undefined || array.length === 0) {
            this.heap = [];
            return;
        }
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
            if (childTwoIdx !== -1 && this.fn(heap[childTwoIdx], heap[childOneIdx])) {
                idxToSwap = childTwoIdx;
            } else {
                idxToSwap = childOneIdx;
            }
            if (this.fn(heap[idxToSwap], heap[currentIdx])) {
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
        while (currentIdx > 0 && this.fn(heap[currentIdx], heap[parentIdx])) {
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
        this.siftDown(0, this.heap.length - 1, this.heap);
        return node;
    }


    insert(obj) {
        this.heap.push(obj);
        let newValueIdx = this.heap.length - 1;
        this.siftUp(newValueIdx, this.heap);
    }

    swap(i, j, heap) {
        const temp = heap[j];
        heap[j] = heap[i];
        heap[i] = temp;
    }
    peek() {
        return this.heap[0];
    }
    size() {
        return this.heap.length;
    }
}

console.log(topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], 2))