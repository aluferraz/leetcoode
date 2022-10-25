/**
 * @param {number[]} nums
 */
var FirstUnique = function (nums) {
    this.queue = new DoublyLinkedList();
    this.nodeMap = new Map();
    for (let i = 0; i < nums.length; i++) {
        this.add(nums[i]);
    }
};

/**
 * @return {number}
 */
FirstUnique.prototype.showFirstUnique = function () {
    if (this.queue.head === null) return -1;
    return this.queue.head.value;

};

/** 
 * @param {number} value
 * @return {void}
 */
FirstUnique.prototype.add = function (value) {
    if (this.nodeMap.has(value)) {
        //Non-unique
        let node = this.nodeMap.get(value);
        this.queue.remove(node);
    } else {
        //unique
        let node = new Node(value);
        if (this.queue.head === null) {
            this.queue.setHead(node);
        } else {
            this.queue.insertAfter(this.queue.tail, node);
        }
        this.nodeMap.set(value, node);
    }


};


class Node {

    constructor(value, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
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

/** 
 * Your FirstUnique object will be instantiated and called as such:
 * var obj = new FirstUnique(nums)
 * var param_1 = obj.showFirstUnique()
 * obj.add(value)
 */
 let firstUnique = new FirstUnique(1);
 console.log((firstUnique.add(1)));
 console.log((firstUnique.add(1)));
 console.log((firstUnique.showFirstUnique()));
 