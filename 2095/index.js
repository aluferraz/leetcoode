/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteMiddle = function (head) {
    if (head === null) return head;
    if (head.next === null) return null;
    let slowP = head;
    let fastP = head;
    let prev = null;

    while (fastP.next !== null) {
        prev = slowP;
        slowP = slowP.next;
        fastP = fastP.next;
        if (fastP.next !== null) {
            fastP = fastP.next;
        }
    }
    if (prev !== null) {
        prev.next = slowP.next;
        slowP.next = null;
    }
    return head;
};

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}


let head = new ListNode(1, new ListNode(3, new ListNode(4, new ListNode(7, new ListNode(1, new ListNode(2, new ListNode(6)))))));
console.log(deleteMiddle(head));