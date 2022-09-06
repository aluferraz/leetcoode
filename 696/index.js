/**
 * @param {string} s
 * @return {number}
 */
var countBinarySubstrings = function (s) {
    let prevCount = 0;
    let currentCount = 0;
    if (s.length === 0) return 0;

    let prev = s[0];
    let result = 0;
    for (let i = 0; i < s.length; i++) {
        //debugger;
        const currentNumber = s[i];
        if (currentNumber !== prev) {
            prevCount = currentCount;
            currentCount = 0;
        }
        currentCount++;
        if (prevCount >= currentCount) result++;
        prev = currentNumber;
    }
    return result;
};
countBinarySubstrings("00100");


