/**
 * @param {string} s
 * @return {string}
 */
var reorganizeString = function (s) {
    if (s.length === 0) return s;


    let mapOfChars = {};
    for (let i = 0; i < s.length; i++) {
        const letter = s[i];
        let count = 0;
        if (letter in mapOfChars) {
            count = mapOfChars[letter].count;
        }
        count++;
        mapOfChars[letter] = {
            letter,
            count
        }
    };
    let even = new DoublyLinkedList();
    let odd = new DoublyLinkedList();
    let target = null;


    for (let letter in mapOfChars) {
        if (mapOfChars[letter].count % 2 === 0) target = even;
        else target = odd;
        for (let i = 0; i < mapOfChars[letter].count; i++) {
            if (target.head === null) {
                target.setHead(new Node(letter));
                target.size++;
            } else {
                target.insertAfter(target.tail, new Node(letter));
                target.size++;
            }
        }
    }
    let result = new DoublyLinkedList();
    result.setHead(new Node(""));
    let remaining = new DoublyLinkedList();
    remaining.setHead(new Node(""));
    let current = null;

    if (even.size > odd.size) target = even;
    else target = odd;

    for (let i = 0; i < 2; i++) {
        if (even.size > odd.size) target = even;
        else target = odd;
        current = target.head;
        while (current !== null) {
            if (result.tail.value === current.value) {
                break;
            }
            result.insertAfter(result.tail, new Node(current.value));
            if (target.tail !== current) {
                if (result.tail.value === target.tail.value) {
                    current = current.next;
                    break;
                }
                result.insertAfter(result.tail, new Node(target.tail.value));
                target.remove(target.tail);
            }
            current = current.next;
        }
        if (current !== null) { //There are remaining letters to interwave
            if (remaining.head.value === "") {
                while (current !== null) {
                    remaining.insertAfter(remaining.tail, new Node(current.value));
                    current = current.next;

                }
                remaining.remove(remaining.head);
            } else {
                //Let's interwave with the remaining
                let remainingCur = remaining.head;
                if (result.head.value === "") result.remove(result.head);
                while (current !== null) {
                    if (remaining.head !== null && remainingCur !== null) {
                        result.insertBefore(result.head, new Node(current.value));
                        result.insertBefore(result.head, new Node(remainingCur.value));
                        remainingCur = remainingCur.next;
                        remaining.remove(remaining.head);
                    } else {
                        if(remaining.tail === null) remaining.setHead(new Node(current.value));
                        else remaining.insertAfter(remaining.tail, new Node(current.value));
                    }
                    current = current.next;

                }
            }
        }
        target.size *= -1;
    }
    let resultArray = [];

    //Remove ''
    if (result.head.value === "") result.remove(result.head);
    if (remaining.head) {
        current = result.head;
        let remainingCur = remaining.head;
        while (current !== null && remainingCur !== null) {

            if (remainingCur.value !== current.value &&
                (current.next === null || current.next.value !== remainingCur.value)) {
                result.insertAfter(current, new Node(remainingCur.value));
                remainingCur = remainingCur.next;
            }
            if (remainingCur !== null && remainingCur.value !== current.value &&
                (current.prev === null || current.prev.value !== remainingCur.value)) {
                result.insertBefore(current, new Node(remainingCur.value));
                remainingCur = remainingCur.next;
            }

            current = current.next;
        }
    }
    current = result.head;
    while (current !== null) {
        if (current.value !== "") resultArray.push(current.value);
        current = current.next;
    }
    return resultArray.length === s.length ? resultArray.join('') : "";
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
        this.size = 0;
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


//debug
console.log(reorganizeString("nlmxhnpifuaxinxpxlcttjnlggmkjioewbecnofqpvcikiazmn"));
