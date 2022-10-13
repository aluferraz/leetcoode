/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    let tAsMap = buildMap(t);
    let remainingToFind = new Set(Object.keys(tAsMap));
    let left = 0;
    let right = 0;
    let miniumString = [0, s.length];
    let found = false;
    let foundMap = {};

    while (right < s.length) {
        let rLetter = s[right];
        if (rLetter in tAsMap) {
            foundMap[rLetter] = (foundMap[rLetter] || 0);
            foundMap[rLetter]++;
            if (foundMap[rLetter] === tAsMap[rLetter]) {
                remainingToFind.delete(rLetter);
            }
        }
        while (remainingToFind.size === 0 && left <= right) {
            found = true;
            if (isSmaller(miniumString, [left, right])) {
                miniumString = [left, right];
            }
            let lLetter = s[left];
            left++;
            if (lLetter in foundMap) {
                foundMap[lLetter]--;
                if (foundMap[lLetter] < tAsMap[lLetter]) {
                    remainingToFind.add(lLetter);
                    break;
                }
            }
        }
        right++;
    }

    if (!found) return "";
    return s.slice(miniumString[0], miniumString[1] + 1);

};

function buildMap(string) {
    let map = {};
    for (let i = 0; i < string.length; i++) {
        let letter = string[i];
        map[letter] = (map[letter] || 0);
        map[letter]++;
    }
    return map;
}

function isSmaller(a, b) {
    let diffA = a[1] - a[0];
    let diffB = b[1] - b[0];
    return diffB < diffA;
}

console.log(minWindow("aab",
    "aab"))