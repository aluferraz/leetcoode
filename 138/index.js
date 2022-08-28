
var copyRandomList = function (head) {
    let current = head;
    let dummy = {};

    let deepCopy = dummy;
    let nodeMap = new Map();
    
    while (current !== null) {
        let newNode = new Node(current.val, null, null);
        nodeMap.set(current, newNode);
        deepCopy.next = newNode;
        //at the first pass, here we lost reference with dummy, but that is ok
        deepCopy = newNode;
        
        current = current.next;
    }
    //Reset the pointers to the head
    deepCopy = dummy.next;
    current = head; 
    while (current !== null) {
        deepCopy.random = nodeMap.get(current.random)
        deepCopy = deepCopy.next;
        current = current.next;
    }



    return dummy.next;
};

/**
 * AUX FOR DEBUGGING:
 */

function Node(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
};

function buildListFromInput(array) {
    if (array.length === 0) return null;
    let current = null;
    let nodeMap = new Map();
    let nodeMapValues = new Map(); //non-sense, but the input is an array of array of integers
    for (let i = 0; i < array.length; i++) {
        const currentTuple = array[i];
        current = new Node(currentTuple[0],
            null,
            null);
        nodeMap.set(i, current);
        nodeMapValues.set(current.val, current);
        current = current.next;

    }
    for (let i = 0; i < array.length; i++) {
        const currentTuple = array[i];
        const currentNode = nodeMap.get(i);
        if ((i + 1) < array.length) currentNode.next = nodeMap.get(i + 1);
        if (currentTuple[1] === null) currentNode.random = null;
        else currentNode.random = nodeMapValues.get(currentTuple[1]);

    }
    return nodeMap.get(0);
}



function copyRandomListHelper(array) {
    const head = buildListFromInput(array);

    return copyRandomList(head);

}
copyRandomListHelper([[7, null], [13, 0], [11, 4], [10, 2], [1, 0]])
