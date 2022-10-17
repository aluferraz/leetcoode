/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var smallestRange = function (nums) {
    let listElements = [];
    for (let i = 0; i < nums.length; i++) {
        // listElements.push(...nums[i].map((el) => { return [el, i] }));
        for (let j = 0; j < nums[i].length; j++) {
            listElements.push(
                [nums[i][j], i]
            )
        }
    }
    listElements.sort((a, b) => { return a[0] - b[0] });

    let left = 0;
    let right = 0;
    let result = [-Infinity, Infinity];

    let listsUsed = new Map();
    let totalOfLists = nums.length;

    while (right < listElements.length) {
        let list = listElements[right][1];

        let count = 0;
        if (listsUsed.has(list)) {
            count = listsUsed.get(list);
        }
        count++;
        listsUsed.set(list, count);

        while (listsUsed.size === totalOfLists && left <= right) {
            result = getMinRange(
                result,
                [listElements[left][0], listElements[right][0]]
            );
            let leftList = listElements[left][1];
            left++;
            count = listsUsed.get(leftList);
            count--;
            if (count === 0) {
                listsUsed.delete(leftList);
            } else {
                listsUsed.set(leftList, count);
            }
        }
        right++;
    }

    return [result[0], result[1]]


};
function getMinRange(rangeA, rangeB) {

    let a = rangeA[0];
    let b = rangeA[1];
    let c = rangeB[0];
    let d = rangeB[1];

    if ((b - a < d - c) || ((a < c) && (b - a == d - c))) {
        return rangeA;
    }
    return rangeB;
}

console.log(smallestRange([[4, 10, 15, 24, 26], [0, 9, 12, 20], [5, 18, 22, 30]]));