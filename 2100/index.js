/**
 * @param {number[]} security
 * @param {number} time
 * @return {number[]}
 */
var goodDaysToRobBank = function (security, time) {
    let increasing = Array(security.length).fill(0);
    let decreasing = Array(security.length).fill(0);
    for (let i = 1; i < security.length; i++) {
        if (security[i] > security[i - 1]) {
            increasing[i] = 1;
        }
        if (security[i] < security[i - 1]) {
            decreasing[i] = 1;
        }
    }
    //presum
    let increasingPresum = Array(security.length).fill(0);
    let decreasingPresum = Array(security.length).fill(0);
    increasingPresum[0] = increasing[0];
    decreasingPresum[0] = decreasing[0];
    for (let i = 1; i < security.length; i++) {
        increasingPresum[i] = increasingPresum[i - 1] + increasing[i];
        decreasingPresum[i] = decreasingPresum[i - 1] + decreasing[i];
    }
    let result = [];
    for (let i = time; i < (security.length - time); i++) {
        let wasIncreasing = increasingPresum[i] - increasingPresum[i - time];
        let wasDecreasing = decreasingPresum[i + time] - decreasingPresum[i];
        if (wasIncreasing + wasDecreasing === 0) {
            result.push(i)
        }

    }
    return result;

};
console.log(goodDaysToRobBank(
    [1, 2, 5, 4, 1, 0, 2, 4, 5, 3, 1, 2, 4, 3, 2, 4, 8],
    2));