/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    let result = {
        next: null
    };
    let smallestIdx = findSmallest(lists);
    let current = result;
    while (smallestIdx !== -1) {
        const currentValue = lists[smallestIdx];
        if (currentValue !== null) { 
            current.next = new ListNode(currentValue.val)
            lists[smallestIdx] = lists[smallestIdx].next; //Move that list 
            current = current.next; //At first pass, result will lost ref. with current, but it will keep the ref to the head of the linked list.
        }
        smallestIdx = findSmallest(lists);
    }
    return result.next;
};
function findSmallest(lists) {
    let initialValue = Infinity;
    let resultIndex = -1;
    for (let i = 0; i < lists.length; i++) {
        const currentPointer = lists[i];
        if (currentPointer !== null &&
            currentPointer.val <= initialValue) {
            initialValue = currentPointer.val;
            resultIndex = i;
        }
    }
    return resultIndex;
}