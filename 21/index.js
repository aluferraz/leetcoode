/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    //Edge case
    if (list1 === null) return list2;
    if (list2 === null) return list1;
    //three pointers
    let pointer1 = list1;
    let pointer2 = list2;
    let result = null;
    let prev = null;
    // Init prev
    if (pointer1.val < pointer2.val) {
        prev = pointer1;
        pointer1 = pointer1.next;
        prev.next = null;
    } else {
        prev = pointer2;
        pointer2 = pointer2.next;
        prev.next = null;
    }
    result = prev;
    while (pointer1 !== null && pointer2 !== null) {
        if (pointer1.val < pointer2.val) {
            prev.next = pointer1;
            pointer1 = pointer1.next;
        } else {
            prev.next = pointer2;
            pointer2 = pointer2.next;
        }
        prev = prev.next;
        prev.next = null;
    }
    if (pointer1 !== null) {
        prev.next = pointer1;
    }
    if (pointer2 !== null) {
        prev.next = pointer2;
    }
    return result;
};



//DEBUG
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}


let list1 = new ListNode(1, new ListNode(2, new ListNode(4)));
let list2 = new ListNode(1, new ListNode(3, new ListNode(4)));
mergeTwoLists(list1, list2)