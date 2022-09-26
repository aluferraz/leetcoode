/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    let carryOn = 0;
    let l1pointer = l1;
    let l2pointer = l2;

    let root = new ListNode(0);
    let current = root;

    while (l1pointer !== null && l2pointer !== null) {
        let [partial, newCarryOn] = doSum(l1pointer.val, l2pointer.val, carryOn);
        carryOn = newCarryOn;
        current.next = new ListNode(partial);
        current = current.next;
        l1pointer = l1pointer.next;
        l2pointer = l2pointer.next;

    }
    while (l1pointer !== null) {
        let [partial, newCarryOn] = doSum(l1pointer.val, 0, carryOn);
        carryOn = newCarryOn;
        current.next = new ListNode(partial);
        current = current.next;
        l1pointer = l1pointer.next;

    }
    while (l2pointer !== null) {
        let [partial, newCarryOn] = doSum(l2pointer.val, 0, carryOn);
        carryOn = newCarryOn;
        current.next = new ListNode(partial);
        current = current.next;
        l2pointer = l2pointer.next;

    }
    if (carryOn !== 0) current.next = new ListNode(carryOn);
    return root.next;
};

function doSum(value1, value2, carryOn) {
    let partial = value1 + value2 + carryOn;
    let newCarryOn = partial >= 10 ? 1 : 0;
    return [partial % 10, newCarryOn];
}