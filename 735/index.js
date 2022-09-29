/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function (array) {
    if (array.length === 0) return 0;
    let stack = [];
    let result = new DoublyLinkedList();
    let nodeMap = new Map();
    let dummyTail = new Node(0);
    result.setTail(dummyTail);
    for (let i = array.length - 1; i >= 0; i--) {
        while (stack.length > 0 && collision(array[i], array[stack[stack.length - 1]])) {
            let collisionResult = calculateCollision(array[i], array[stack[stack.length - 1]]);
            let nodeIdx = stack.pop();
            let nextNode = nodeMap.get(nodeIdx);
            result.remove(nextNode);
            nodeMap.delete(nodeIdx);
            array[i] = collisionResult;
            if (collisionResult === 0) break;
        }
        if (array[i] === 0) continue;
        stack.push(i);
        let node = new Node(array[i]);
        result.insertBefore(result.head, node);
        nodeMap.set(i, node);
    }
    result.remove(dummyTail);
    return result.toArray();

};

function calculateCollision(value, prevValue) {
    if (Math.abs(value) === Math.abs(prevValue)) return 0;
    if (Math.abs(value) > Math.abs(prevValue)) return value;
    return prevValue;
}

function collision(a, b) {
    return (a >= 0 && b < 0);
}

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
    fromArray(array) {
        if (array.length === 0) return;
        this.setHead(new Node(array[0]));
        for (let i = 1; i < array.length; i++) {
            this.insertAfter(this.tail, new Node(array[i]));
        }
        return this;
    }
    toArray() {
        let result = [];
        let current = this.head;
        while (current !== null) {
            result.push(current.value);
            current = current.next;
        }
        return result;
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
//DEBUG
console.log(asteroidCollision([-2,2,-1,-2]));