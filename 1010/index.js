/**
 * @param {number[]} time
 * @return {number}
 */
var numPairsDivisibleBy60 = function (time) {
    const counter = Array(60).fill(0);
    let result = 0;
    for (let i = 0; i < time.length; i++) {
        let seenIdx = (60 - (time[i] % 60)) % 60; // The %60 in the end is to handle de 0 edge case, where 60 - 0 = 60, but (time[i] % 60) will never be 60.
        result += counter[seenIdx];
        counter[time[i] % 60]++;
    }
    return result;
};