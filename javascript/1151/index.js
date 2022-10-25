/**
 * @param {number[]} data
 * @return {number}
 */
var minSwaps = function (data) {
    let totalOfOnes = 0;
    //debugger;
    if (data.length === 0) return 0;

    for (let i = 0; i < data.length; i++) {
        totalOfOnes += data[i];
    }

    //We need a subarray of size totalOfOnes.
    //Let's pick the subarray with the most one's present
    const windowSize = totalOfOnes;
    let left = 0;
    let right = 0;
    let maxOnesInWindow = 0;
    let currentOnesInWindow = 0;
    while (right < (data.length * 2)) {
        let rightAdjusted = right % data.length;
        let leftAdjusted = left % data.length;
        if (data[rightAdjusted] === 1) currentOnesInWindow++;
        if ((right - left) === windowSize) {
            currentOnesInWindow = currentOnesInWindow - data[leftAdjusted];
            left++;
        }
        right++;
        maxOnesInWindow = Math.max(maxOnesInWindow, currentOnesInWindow);
    }
    //now I now the subarray of size TotalOfOnes in the input array
    //that have the most ones in it. I must fill all zeros in this
    //subarray with one.
    return totalOfOnes - maxOnesInWindow;

};



minSwaps([1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1])



minSwaps([1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1]);
minSwaps([0, 0, 0, 1, 0]);
minSwaps([1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1]);
