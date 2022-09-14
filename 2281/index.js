/**
 * @param {number[]} strength
 * @return {number}
 */

var totalStrength = function (strength) {
    //First we need to discover in how many arrays
    //a[i] is the min, so we use NGE and PGE
    // the number will be PGE * NGE -> but we will store the idx instead of element
    let PGE = getPreviousGreaterElementIdx(strength);
    let NGE = getNextGreaterElementIdx(strength);


    
};
function getPreviousGreaterElementIdx(array) {
    //Monotonic stack
    let stack = [];
    let PGE = Array(array.length).fill(-1);
    for (let i = (array.length - 1); i >= 0; i--) {
        while (stack.length > 0 && array[stack[stack.length - 1]] < array[i]) {
            PGE[stack.pop()] = i;
        }
        stack.push(i);
    }
    return PGE;
}

function getNextGreaterElementIdx(array) {
    //Monotonic stack
    let stack = [];
    let NGE = Array(array.length).fill(array.length);
    for (let i = 0; i < array.length; i++) {
        //Here we are going to use <= to avoid duplicates (Edge case-> repeated numbers in the array)

        while (stack.length > 0 && array[stack[stack.length - 1]] <= array[i]) {
            NGE[stack.pop()] = i;
        }
        stack.push(i);
    }
    return NGE;
}