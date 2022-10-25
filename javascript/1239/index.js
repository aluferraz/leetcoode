/**
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function (arr) {
    arr = arr.map((el) => {
        let line = Array(26).fill(0);
        for (let i = 0; i < el.length; i++) {
            let idx = el.charCodeAt(i) - "a".charCodeAt(0);
            line[idx]++;
        }
        return line;
    });

    arr = arr.filter((word) => {
        for (let i = 0; i < 26; i++) {
            if (word[i] > 1) {
                return false;
            }
            return true;
        }
    });


    let maxInfo = { max: 0 };
    for (let i = 0; i < arr.length; i++) {
        maxLengthRec(arr[i], i, arr, maxInfo);
    }
    return maxInfo.max;
};

function maxLengthRec(comparing, idx, arr, maxInfo) {
    if (idx === arr.length) {
        let max = 0;
        for (let i = 0; i < 26; i++) {
            if (comparing[i] <= 1) {
                max += comparing[i];
            } else {
                max = 0;
                break;
            }
        }
        maxInfo.max = Math.max(maxInfo.max, max);
        return;
    }
    let newArray = comparing.slice();
    let canUse = true;
    for (let i = 0; i < 26; i++) {
        if (newArray[i] + arr[idx][i] <= 1) {
            newArray[i] = newArray[i] + arr[idx][i];
        } else {
            canUse = false;
            break;
        }
    }
    maxLengthRec(comparing, idx + 1, arr, maxInfo);
    if (canUse) maxLengthRec(newArray, idx + 1, arr, maxInfo);
}

console.log(maxLength(["cha", "r", "act", "ers"]));