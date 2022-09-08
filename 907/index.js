/**
 * @param {number[]} arr
 * @return {number}
 */
var sumSubarrayMins = function (arr) {
    // PLE: Previous lesser element
    // NLE: Next lesser element
    let PLEidx = Array(arr.length).fill(-1);
    let NLEidx = Array(arr.length).fill(arr.length);
    let stack = [];
    for (let i = 0; i < arr.length; i++) {
        while (stack.length > 0 && arr[stack[stack.length - 1]] > arr[i]) {
            NLEidx[stack.pop()] = i;
        }
        stack.push(i);
    }
    stack = [];
    for (let i = (arr.length - 1); i >= 0; i--) {

        while (stack.length > 0 && arr[i] <= arr[stack[stack.length - 1]]) {
            PLEidx[stack.pop()] = i;
        }
        stack.push(i);
    }
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        const currentNumber = arr[i];
        let left = (i - PLEidx[i]);
        let right = (NLEidx[i] - i);
        let numberOfArraysWithCurrentIdxAsMin = right * left;
        sum += (numberOfArraysWithCurrentIdxAsMin * currentNumber);
    }
    return sum;


};


