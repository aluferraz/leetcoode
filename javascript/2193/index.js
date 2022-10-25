/**
 * @param {string} s
 * @return {number}
 */
var minMovesToMakePalindrome = function (s) {
    let left = 0;
    let right = s.length - 1;
    let sAsArray = s.split("");
    let moves = 0;
    while (left < right) {
        if (sAsArray[left] !== sAsArray[right]) {
            let nextFromLeft = findNext(sAsArray, left, sAsArray[right], 1);
            let nextFromRight = findNext(sAsArray, right, sAsArray[left], -1);

            let leftDistance = (nextFromLeft - left);
            let rightDistance = (right - nextFromRight);
            if (leftDistance < rightDistance) {
                //swap to replace left letter
                while (sAsArray[left] !== sAsArray[right]) {
                    swap((nextFromLeft - 1), nextFromLeft, sAsArray);
                    moves++;
                    nextFromLeft--;
                }
            } else {
                //swap to replace right letter
                while (sAsArray[left] !== sAsArray[right]) {
                    swap((nextFromRight + 1), nextFromRight, sAsArray);
                    moves++;
                    nextFromRight++;
                }
            }
        }
        left++;
        right--;
    }
    return moves;
}

function findNext(sAsArray, start, target, step) {
    let i = start;
    while (sAsArray[i] !== target && sAsArray[i] !== undefined) {
        i += step;
    }
    return i;
}

function swap(a, b, target) {
    let temp = target[a];
    target[a] = target[b];
    target[b] = temp;
}
minMovesToMakePalindrome("eqvvhtcsaaqtqesvvqch")