/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
    let p1 = node;
    let p2 = node.next;
    p1.val = p2.val;
    p1.next = p2.next;
    p2.next = null;
};



function ListNode(val) {
    this.val = val;
    this.next = null;
}

let head = new ListNode(4);
head.next = new ListNode(5);
head.next.next = new ListNode(1);
head.next.next.next = new ListNode(9);

deleteNode(head.next);