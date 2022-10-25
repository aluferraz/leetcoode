/**
 * @param {number} length
 * @param {number[][]} updates
 * @return {number[]}
 */
var getModifiedArray = function (length, updates) {
    let startArray = Array(length).fill(0);
    if (updates.length === 0) return startArray;
    // debugger;
    updates.sort((a, b) => { return a[0] - b[0] }); //UlogU
    for (let i = 0; i < length; i++) {
        let closestIdx = getClosestIdx(updates, i); //LogU
        for (let j = closestIdx; j < updates.length; j++) { 

            if (i >= updates[j][0] && i <= updates[j][1]) {
                startArray[i] += updates[j][2];
            }
            if (updates[j][0] > i) {
                break;
            }
        }
    }
    return startArray;
};


function getClosestIdx(updates, target) {
    let left = 0;
    let right = updates.length - 1;
    let mid = Math.floor((left + right) / 2);
    while (left < right) {
        mid = Math.floor((left + right) / 2);
        if (updates[mid] === target) return mid;
        if (updates[mid] > target) left++;
        else right--;

    }
    return mid;
}


//UlogU  + LlogU
//(U + L) *( log U )