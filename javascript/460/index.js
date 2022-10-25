/**
 * @param {number} capacity
 */
/**
 * To be able to drop the least frequenty used in constant time, we shoud use a LL
 * we can use a hashtable to get the keys in constant time
 * 
 * how to keep the most frequent used sorted? every get operation, we make it the tail.
 */


var LFUCache = function (capacity) {
    this.LFU = new Map(); //Map respect the order that the keys were inserted
    this.LRU = new DoublyLinkedList();
    this.nodeMap = new Map();
    this.LRUNodeMap = new Map();
    this.capacity = capacity;
    this.minCount = Infinity;

};

/** 
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function (key) {
    if (this.capacity === 0) return -1;
    //needs to update frequency
    if (this.nodeMap.has(key)) {
        const resultNode = this.nodeMap.get(key);
        this.put(resultNode.key, resultNode.value); //Will increment it's count only.
        return resultNode.value;
    }
    return -1;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function (key, value) {
    if (this.capacity === 0) return;
    let existing = false;
    //Node
    let nodeToInsert = new Node(key, value, 0);
    if (this.nodeMap.has(key)) {
        //Existing:needs to update cnt
        nodeToInsert = this.nodeMap.get(key);
        existing = true;
    } else {
        //New: needs to update cnt
        if (this.nodeMap.size === this.capacity) {
            this.dropLFU();
        }
    }
    let LFULinkedList = null;
    if (existing && this.LFU.has(nodeToInsert.count)) {
        this.removeFromLFU(nodeToInsert);
    }
    //Changes the node
    nodeToInsert.value = value;
    nodeToInsert.count++;
    //Re add the node to the new count index
    if (!this.LFU.has(nodeToInsert.count)) {
        LFULinkedList = new DoublyLinkedList();
    } else {
        LFULinkedList = this.LFU.get(nodeToInsert.count);
    }

    LFULinkedList.setTail(nodeToInsert);// The tail will be the most frequent of that count
    this.LFU.set(nodeToInsert.count, LFULinkedList);
    //Edge case, but the idea is:
    //the min count starts with Inf, and reset to Inf if there are no more nodes with that count.
    //every time we remove all nodes with the same count
    //this means that we are either increment its current count
    //or we a creating a new node with count 1.
    //On both cases, at this line the min count would be set again.
    if (nodeToInsert.count < this.minCount) this.minCount = nodeToInsert.count;

    //Avoiding ref to the same object
    let LRUNode = new Node(key, value, nodeToInsert.count);
    if (this.LRUNodeMap.has(nodeToInsert.key)) {
        LRUNode = this.LRUNodeMap.get(nodeToInsert.key);
        LRUNode.value = nodeToInsert.value;
        LRUNode.count = nodeToInsert.count;
    }
    if (this.LRU.tail === null || this.LRU.tail.key !== key)
        this.LRU.setTail(LRUNode);

    //Cache to read in constant time
    this.nodeMap.set(key, nodeToInsert);
    this.LRUNodeMap.set(key, LRUNode);

};

LFUCache.prototype.dropLFU = function () {
    if (this.capacity === 1) {
        this.LFU = new Map();
        this.LRU = new DoublyLinkedList();
        this.nodeMap = new Map();
        this.LRUNodeMap = new Map();
        return;
    }
    let lfuNodeToRemove = null;
    let lruNodeToRemove = null;
    let LFULinkedList = null;
    let keyToRemove = null;
    let LFUIterator = this.LFU.keys();

    //The min count will be at the first position
    let LfuEntries = LFUIterator.next();
    if (!(LfuEntries.done)) {
        //We have more keys, so we have a bigger count
        LFULinkedList = this.LFU.get(this.minCount);
        lfuNodeToRemove = LFULinkedList.head;
        keyToRemove = lfuNodeToRemove.key;
        if (this.LRUNodeMap.has(keyToRemove))
            lruNodeToRemove = this.LRUNodeMap.get(keyToRemove);
    } else {
        //We only have one cout key, so its a Tie.
        //We use the LRU linked list to find the key that must be deleted.
        lruNodeToRemove = this.LRU.head;
        keyToRemove = lruNodeToRemove.key;
        if (this.nodeMap.has(keyToRemove)) {
            lfuNodeToRemove = this.nodeMap.get(keyToRemove);
            if (this.LFU.has(lfuNodeToRemove.count))
                LFULinkedList = this.LFU.get(lfuNodeToRemove.count);
        }


    }

    if (lfuNodeToRemove === null || lruNodeToRemove === null || keyToRemove === null || LFULinkedList === null) throw new Error("Invalid operation");


    //Easy cases
    this.LRU.remove(lruNodeToRemove);
    this.LRUNodeMap.delete(keyToRemove);
    //LFU
    this.removeFromLFU(lfuNodeToRemove)
    //Final removal
    this.nodeMap.delete(keyToRemove);
}

LFUCache.prototype.removeFromLFU = function (node) {
    let LFULinkedList = this.LFU.get(node.count);
    LFULinkedList.remove(node); //We remove from this "count" index
    if (LFULinkedList.head === null) {
        this.LFU.delete(node.count);
        this.nodeMap.delete(node.key);
        if (node.count === this.minCount)
            //Edge case, but the idea is:
            //the min count starts with Inf, and reset to Inf if there are no more nodes with that count.
            //every time we remove all nodes with the same count
            //this means that we are either increment its current count
            //or we a creating a new node with count 1.
            //On both cases, at this line the min count would be set again on line 82
            this.minCount = Infinity;
    }
}


/** 
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */




class Node {
    constructor(key, value, count) {
        this.value = value;
        this.key = key;
        this.count = count;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // O(1) time | O(1) space
    setHead(node) {
        if (this.head === null) {
            this.head = node;
            this.tail = node;
            return;
        }
        this.insertBefore(this.head, node);
    }

    // O(1) time | O(1) space
    setTail(node) {
        if (this.tail === null) {
            this.setHead(node);
            return;
        }
        this.insertAfter(this.tail, node);
        //LMF
        if (this.head === null) {
            //        debugger;
            this.head = this.tail;
        }
    }

    // O(1) time | O(1) space
    insertBefore(node, nodeToInsert) {
        if (nodeToInsert === this.head && nodeToInsert === this.tail) return;
        this.remove(nodeToInsert);
        nodeToInsert.prev = node.prev;
        nodeToInsert.next = node;
        if (node.prev === null) {
            this.head = nodeToInsert;
        } else {
            node.prev.next = nodeToInsert;
        }
        node.prev = nodeToInsert;
    }

    // O(1) time | O(1) space
    insertAfter(node, nodeToInsert) {
        if (nodeToInsert === this.head && nodeToInsert === this.tail) return;
        this.remove(nodeToInsert);
        nodeToInsert.prev = node;
        nodeToInsert.next = node.next;
        if (node.next === null) {
            this.tail = nodeToInsert;
        } else {
            node.next.prev = nodeToInsert;
        }
        node.next = nodeToInsert;
    }

    // O(p) time | O(1) space
    insertAtPosition(position, nodeToInsert) {
        if (position === 1) {
            this.setHead(nodeToInsert);
            return;
        }
        let node = this.head;
        let currentPosition = 1;
        while (node !== null && currentPosition++ !== position) node = node.next;
        if (node !== null) {
            this.insertBefore(node, nodeToInsert);
        } else {
            this.setTail(nodeToInsert);
        }
    }

    // O(n) time | O(1) space
    removeNodesWithValue(value) {
        let node = this.head;
        while (node !== null) {
            const nodeToRemove = node;
            node = node.next;
            if (nodeToRemove.value === value) this.remove(nodeToRemove);
        }
    }

    // O(1) time | O(1) space
    remove(node) {
        if (node === this.head) this.head = this.head.next;
        if (node === this.tail) this.tail = this.tail.prev;
        this.removeNodeBindings(node);
    }

    // O(n) time | O(1) space
    containsNodeWithValue(value) {
        let node = this.head;
        while (node !== null && node.value !== value) node = node.next;
        return node !== null;
    }

    removeNodeBindings(node) {
        if (node.prev !== null) node.prev.next = node.next;
        if (node.next !== null) node.next.prev = node.prev;
        node.prev = null;
        node.next = null;
    }
}


let lfuCache = new LFUCache(3);
console.log((lfuCache.put(2, 2)));
console.log((lfuCache.put(1, 1)));
console.log((lfuCache.get(2)));
console.log((lfuCache.get(1)));
console.log((lfuCache.get(2)));
console.log((lfuCache.put(3, 3)));
debugger;

console.log((lfuCache.put(4, 4)));
console.log((lfuCache.get(3)));
console.log((lfuCache.get(2)));
console.log((lfuCache.get(1)));
console.log((lfuCache.get(4)));

// let lfuCache = new LFUCache(10)
// console.log((lfuCache.put(10, 13)));
// console.log((lfuCache.put(3, 17)));
// console.log((lfuCache.put(6, 11)));
// console.log((lfuCache.put(10, 5)));
// console.log((lfuCache.put(9, 10)));
// console.log((lfuCache.get(13)));
// console.log((lfuCache.put(2, 19)));
// console.log((lfuCache.get(2)));
// console.log((lfuCache.get(3)));
// console.log((lfuCache.put(5, 25)));
// console.log((lfuCache.get(8)));
// console.log((lfuCache.put(9, 22)));
// console.log((lfuCache.put(5, 5)));
// console.log((lfuCache.put(1, 30)));
// console.log((lfuCache.get(11)));
// console.log((lfuCache.put(9, 12)));
// console.log((lfuCache.get(7)));
// console.log((lfuCache.get(5)));
// console.log((lfuCache.get(8)));
// console.log((lfuCache.get(9)));
// console.log((lfuCache.put(4, 30)));
// console.log((lfuCache.put(9, 3)));
// console.log((lfuCache.get(9)));

// console.log((lfuCache.get(10)));
// console.log((lfuCache.get(10)));
// console.log((lfuCache.put(6, 14)));
// console.log((lfuCache.put(3, 1)));
// console.log((lfuCache.get(3)));
// console.log((lfuCache.put(10, 11)));
// console.log((lfuCache.get(8)));
// console.log((lfuCache.put(2, 14)));
// console.log((lfuCache.get(1)));
// console.log((lfuCache.get(5)));
// console.log((lfuCache.get(4)));
// debugger
// console.log((lfuCache.put(11, 4)));

// console.log((lfuCache.put(12, 24)));
// console.log((lfuCache.put(5, 18)));
// console.log((lfuCache.get(13)));

// console.log((lfuCache.put(7, 23)));
// console.log((lfuCache.get(8)));
// console.log((lfuCache.get(12)));
// console.log((lfuCache.put(3, 27)));
// console.log((lfuCache.put(2, 12)));
// console.log((lfuCache.get(5)));
// console.log((lfuCache.put(2, 9)));
// console.log((lfuCache.put(13, 4)));
// console.log((lfuCache.put(8, 18)));;
// console.log((lfuCache.put(1, 7)));
// console.log((lfuCache.get(6)));
// console.log((lfuCache.put(9, 29)));
// console.log((lfuCache.put(8, 21)));
// console.log((lfuCache.get(5)));
// console.log((lfuCache.put(6, 30)));
// console.log((lfuCache.put(1, 12)));
// console.log((lfuCache.get(10)));
// console.log((lfuCache.put(4, 15)));
// console.log((lfuCache.put(7, 22)));
// console.log((lfuCache.put(11, 26)));
// console.log((lfuCache.put(8, 17)));
// console.log((lfuCache.put(9, 29)));
// console.log((lfuCache.get(5)));
// console.log((lfuCache.put(3, 4)));
// console.log((lfuCache.put(11, 30)));
// console.log((lfuCache.get(12)));
// console.log((lfuCache.put(4, 29)));
// console.log((lfuCache.get(3)));
// console.log((lfuCache.get(9)));
// console.log((lfuCache.get(6)));
// console.log((lfuCache.put(3, 4)));
// console.log((lfuCache.get(1)));
// console.log((lfuCache.get(10))); //expected 11
// console.log((lfuCache.put(3, 29)));
// console.log((lfuCache.put(10, 28)));
// console.log((lfuCache.put(1, 20)));
// console.log((lfuCache.put(11, 13)));
// console.log((lfuCache.get(3)));
// console.log((lfuCache.put(3, 12)));
// console.log((lfuCache.put(3, 8)));
// console.log((lfuCache.put(10, 9)));
// console.log((lfuCache.put(3, 26)));
// console.log((lfuCache.get(8)));
// console.log((lfuCache.get(7)));
// console.log((lfuCache.get(5)));
// console.log((lfuCache.put(13, 17)));
// console.log((lfuCache.put(2, 27)));
// console.log((lfuCache.put(11, 15)));
// console.log((lfuCache.get(12)));
// console.log((lfuCache.put(9, 19)));
// console.log((lfuCache.put(2, 15)));
// console.log((lfuCache.put(3, 16)));
// console.log((lfuCache.get(1)));
// console.log((lfuCache.put(12, 17)));
// console.log((lfuCache.put(9, 1)));
// console.log((lfuCache.put(6, 19)));
// console.log((lfuCache.get(4)));
// console.log((lfuCache.get(5)));
// console.log((lfuCache.get(5)));
// console.log((lfuCache.put(8, 1)));
// console.log((lfuCache.put(11, 7)));
// console.log((lfuCache.put(5, 2)));
// console.log((lfuCache.put(9, 28)));
// console.log((lfuCache.get(1)));
// console.log((lfuCache.put(2, 2)));
// console.log((lfuCache.put(7, 4)));
// console.log((lfuCache.put(4, 22)));
// console.log((lfuCache.put(7, 24)));
// console.log((lfuCache.put(9, 26)));
// console.log((lfuCache.put(13, 28)));
// console.log((lfuCache.put(11, 26)));

