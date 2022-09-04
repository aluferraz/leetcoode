/**
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */

/**
 * 
Return all non-negative integers of length n such that the absolute difference between every two consecutive digits is k.
Note that every number in the answer must not have leading zeros. For example, 01 has one leading zero and is invalid.
You may return the answer in any order.



if k = sum of 2 digits, MAX(K) === 18
 */
var numsSameConsecDiff = function (n, k) {
    const result = [];
 //   debugger;
    for (let i = 1; i < 10; i++) {
        const currentNum = [i]
        findPairs(n - 1, k, currentNum, result);
    }
    return result;
};

function findPairs(n, k, currentNum, result) {
    if (n === 0) {
        if (currentNum[0] !== 0) result.push(parseInt(currentNum.join('')))
        return;
    }
    for (let i = 0; i < 10; i++) {
        const currentSum = currentNum[currentNum.length - 1];
        if (Math.abs(currentSum - i) === k) {
            currentNum.push(i)
            findPairs((n - 1), k, currentNum, result);
            currentNum.pop();
        }
    }

}
numsSameConsecDiff(3, 1);