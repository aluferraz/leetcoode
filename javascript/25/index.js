/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
    let current = head;
    let llArray = [];
    let tail = null
    while (current !== null) {
        let groupHead = current;
        for (let i = 0; i < k - 1; i++) {
            if (current !== null) {
                current = current.next;
            }
        }
        if (current !== null) {
            let p2 = current.next;
            current.next = null; //Make as tail
            current = p2;
            llArray.push(groupHead);
        } else {
            tail = groupHead;
        }

    }
    if (llArray.length === 0) return head;

    for (let i = 0; i < llArray.length; i++) {
        llArray[i] = reverseLinkedList(llArray[i]);
    }

    let result = llArray[0];
    let left = 1;
    current = result;
    while (left < llArray.length) {
        while (current.next !== null) {
            current = current.next;
        }
        current.next = llArray[left];
        left++;
    }
    while (current.next !== null) {
        current = current.next;
    }
    current.next = tail;

    return result;
};


function getNextTail(head, k) {
    let tail = head;
    for (let i = 0; i < k; i++) {
        tail = tail.next;
        if (tail === null) return false;
    }
    return tail;
}


function reverseLinkedList(head) {
    let p1 = head;
    let p2 = head.next;
    let prev = null;

    while (p1 !== null) {
        p1.next = prev;
        prev = p1;
        p1 = p2;
        if (p2 !== null) {
            p2 = p2.next;
        } else {
            p2 = null;
        }
    }
    let newHead = prev;
    return newHead;

}

//[1,2,3,4,5]

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}


let head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))))

reverseKGroup(head, 3);