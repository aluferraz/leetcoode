
// var SORTracker = function() {

// };

// /** 
//  * @param {string} name 
//  * @param {number} score
//  * @return {void}
//  */
// SORTracker.prototype.add = function(name, score) {

// };

// /**
//  * @return {string}
//  */
// SORTracker.prototype.get = function() {

// };

class SORTracker {

    constructor() {
        this.getCount = 0;
        this.bestLocations = new Heap(MIN_HEAP);
        this.locationsQueue = new Heap(MAX_HEAP);
    }

    add(name, score) {
        this.bestLocations.insert({ name, score });
        this.rebalance();
    }

    get() {
        let result = this.bestLocations.peek().name;
        this.getCount++;
        this.rebalance();
        return result;
    }

    rebalance() {
        if (this.bestLocations.size() > this.getCount + 1) {
            this.locationsQueue.insert(this.bestLocations.remove());
        } else {
            if (this.locationsQueue.size() > 0) this.bestLocations.insert(this.locationsQueue.remove())
        }
    }


}



const MAX_HEAP = function (a, b) {
    if (a.score === b.score) return a.name < b.name;
    return a.score > b.score
}
const MIN_HEAP = function (a, b) {
    if (a.score === b.score) return a.name > b.name;
    return a.score < b.score
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


/** 
 * Your SORTracker object will be instantiated and called as such:
 * var obj = new SORTracker()
 * obj.add(name,score)
 * var param_2 = obj.get()
 */
 let sortTracker = new SORTracker();
 console.log((sortTracker.add("happy",100000)));
 console.log((sortTracker.add("thanks",100000)));
 console.log((sortTracker.add("giving",99999)));
 console.log((sortTracker.add("everyone",11111)));
 console.log((sortTracker.get()));
 console.log((sortTracker.get()));
 console.log((sortTracker.get()));
 console.log((sortTracker.get()));