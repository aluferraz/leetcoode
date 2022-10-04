/**
 * @param {string} colors
 * @param {number[]} neededTime
 * @return {number}
 */
var minCost = function (colors, neededTime) {
    let left = 0;
    let right = left + 1;
    let minCost = 0;
    while (right < colors.length) {
        while (colors[left] === colors[right]) {
            if (neededTime[left] < neededTime[right]) {
                minCost += neededTime[left];
                left = right;
                right = left + 1;
            } else {
                minCost += neededTime[right];
                right++;
            }
        }
        left = right;
        right = left + 1;
    }
    return minCost;
};
console.log(minCost(
    "aaabbbabbbb",
    [3, 5, 10, 7, 5, 3, 5, 5, 4, 8, 1]
))
