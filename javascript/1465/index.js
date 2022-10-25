/**
 * @param {number} h
 * @param {number} w
 * @param {number[]} horizontalCuts
 * @param {number[]} verticalCuts
 * @return {number}
 */
//Presum
const mod = BigInt(Math.pow(10, 9) + 7);
var maxArea = function (h, w, horizontalCuts, verticalCuts) {
    //let presumMatrix = getPresum(h, w);
  //  debugger;
    [horizontalCuts, verticalCuts] = sortCutsAndPlaceBorders(h, w, horizontalCuts, verticalCuts);
    let [maxHorizontalDiff, maxVerticalDiff] = getDiff(horizontalCuts, verticalCuts);
    const maxArea = BigInt(maxHorizontalDiff) * BigInt(maxVerticalDiff) % mod;
    return parseInt(maxArea);
};
function getDiff(horizontalCuts, verticalCuts) {
    let maxHorizontalDiff = -Infinity;
    let maxVerticalDiff = -Infinity;
    //The arrays are sorted
    for (let i = 1; i < horizontalCuts.length; i++) {
        maxHorizontalDiff = Math.max((horizontalCuts[i] - horizontalCuts[i - 1]), maxHorizontalDiff);
    }

    for (let i = 1; i < verticalCuts.length; i++) {
        maxVerticalDiff = Math.max((verticalCuts[i] - verticalCuts[i - 1]), maxVerticalDiff);
    }

    return [maxHorizontalDiff, maxVerticalDiff]
}


function sortCutsAndPlaceBorders(h, w, horizontalCuts, verticalCuts) {



    //We need to consider the borders as cuts
    //This way we are also handling the edge case where the cuts array is empty
    horizontalCuts.sort((a, b) => { return a - b });
    verticalCuts.sort((a, b) => { return a - b });
    if (horizontalCuts.length === 0 || horizontalCuts[0] !== 0) {
        horizontalCuts = [0].concat(horizontalCuts);
    }
    if (horizontalCuts[horizontalCuts.length - 1] !== h) {
        horizontalCuts = horizontalCuts.concat([h]);
    }

    if (verticalCuts.length === 0 || verticalCuts[0] !== 0) {
        verticalCuts = [0].concat(verticalCuts);
    }
    if (verticalCuts[verticalCuts.length - 1] !== w) {
        verticalCuts = verticalCuts.concat(w);
    }
    return [horizontalCuts, verticalCuts];
}
//maxArea(5, 4, [1, 2, 4], [1, 3]);
maxArea(1000000000, 1000000000, [2], [2])