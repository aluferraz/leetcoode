/**
 * Definition for a binary tree node.
 * function Node(val, left, right) {
 *     this.val = (val===undefined ? " " : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {string} s
 * @return {Node}
 */



var expTree = function (s, start = null, end = null) {

    let [linkedList, operators] = createLinkedList(s, start, end);
    if (operators.length === 0) {
        let root = getNodeOrOp(linkedList.head);
        let current = linkedList.head.next;
        while (current !== null) {
            root.right = getNodeOrOp(current.val);
            current = current.next;
        }
        return root;
    }



    for (let i = 0; i < operators.length; i++) { //O(1)
        let targetOp = operators[i];
        let current = linkedList.head;

        while (current !== null) {
            let op = current.val;
            if (op === targetOp) {
                let leftLLNode = current.prev;
                let rightLLNode = current.next;

                let left = getNodeOrOp(current.prev);
                let right = getNodeOrOp(current.next);
                let mathNode = new Node(op, left, right);

                let llNode = new LLNode(mathNode, leftLLNode.prev, rightLLNode.next);
                let prevNode = leftLLNode.prev;
                let nextNode = rightLLNode.next;
                if (prevNode !== null) {
                    linkedList.remove(current);
                    linkedList.remove(leftLLNode);
                    linkedList.remove(rightLLNode);
                    linkedList.insertAfter(prevNode, llNode);
                } else if (nextNode !== null) {
                    linkedList.insertBefore(nextNode, llNode);
                    linkedList.remove(current);
                } else {
                    linkedList.setHead(llNode);
                }

                //current = nextNode; continue;
                break;// Go to next priority
            }
            current = current.next;
        }


    }
    return linkedList.head.val;
};

function hasPriority(op) {
    return op === '*' || op === '/' || op == '('
}

function getNodeOrOp(llnode) {
    let isNumber = !isNaN(llnode.val);
    if (isNumber) return new Node(llnode.val);
    return llnode.val;
}

function createLinkedList(s, start = null, end = null) {
    let linkedList = new DoublyLinkedList();
    let operatorsHiPrio = [];
    let operatorsLowPrio = [];
    if (start === null) start = 0;
    if (end === null) end = s.length;
    let parentesisMap = new Map();
    let closing = [];
    for (let i = end - 1; i >= start; i--) {
        if (s[i] === '(' && closing.length > 0) {
            let startInner = i + 1;
            let ending = closing.pop();
            nextNode = new LLNode(expTree(s, startInner, ending)); //Recursive build the ll of the parentesis
            parentesisMap.set(i, [nextNode, ending])
        }
        if (s[i] === ')') closing.push(i)
    }



    for (let i = start; i < end; i++) {
        let nextNode = null;


        if (s[i] === '(') {
            nextNode = parentesisMap.get(i)[0];
            i = parentesisMap.get(i)[1];
        } else {
            nextNode = new LLNode(s[i]);
        }

        if (linkedList.head === null) linkedList.setHead(nextNode);
        else linkedList.insertAfter(linkedList.tail, nextNode);

        if (isNaN(s[i]) && s[i] !== '(' && s[i] !== ')') {
            if (hasPriority(s[i])) operatorsHiPrio.push(s[i]);
            else operatorsLowPrio.push(s[i]);
        }
    }
    return [linkedList, operatorsHiPrio.concat(operatorsLowPrio)];
}

class LLNode {
    constructor(val, prev = null, next = null) {
        this.val = val;
        this.prev = prev;
        this.next = next;
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

////// DEBUG //////

function inOrder(node, arr) {
    if (node === null) return "";
    let current = node.val;
    arr.push(current)
    let left = inOrder(node.left, arr)
    let right = inOrder(node.right, arr)
    // return left + current + right;
    return arr;
}
function Node(val, left, right) {
    this.val = (val === undefined ? " " : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
console.log(inOrder(expTree("(9-3)*9+6-5+8"), []));
