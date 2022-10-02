/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    let medianPosition = Math.ceil((nums1.length + nums2.length) / 2);
    let isOdd = ((nums1.length + nums2.length) % 2) !== 0;
    if (!isOdd) { // Even
        medianPosition++;
    }
    let merged = mergeUntilLen(nums1, nums2, medianPosition);
    if (isOdd) {
        return merged.pop();
    }
    // Even
    let num1 = merged.pop();
    let num2 = merged.pop();
    return (num1 + num2) / 2;

};

function mergeUntilLen(nums1, nums2, medianPosition) {
    let pos1 = 0;
    let pos2 = 0;
    let result = []; // Can be done on O(1) space using a LL and keep track from the last two only

    while (pos1 < nums1.length && pos2 < nums2.length && result.length < medianPosition) {
        if (nums1[pos1] < nums2[pos2]) {
            result.push(nums1[pos1]);
            pos1++;
        } else {
            result.push(nums2[pos2]);
            pos2++;
        }
    }

    while (pos1 < nums1.length && result.length < medianPosition) {
        result.push(nums1[pos1]);
        pos1++;
    }
    while (pos2 < nums2.length && result.length < medianPosition) {
        result.push(nums2[pos2]);
        pos2++;
    }

    return result;
}

console.log(findMedianSortedArrays(
    [],
    [2, 3]))