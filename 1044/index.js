/**
 * @param {string} s
 * @return {string}
 */
//Suffix Tree is the correct solution
//Rabin Karp can be used as well
//but it would take too long to code
var longestDupSubstring = function (s) {
    let left = 0;
    let right = s.length;
    let longestDupSubstring = "";
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        let repeated = getSubstrings(s, mid);
        if (repeated.length > longestDupSubstring.length) longestDupSubstring = repeated;
        if (repeated.length === 0) {
            right = mid;
        } else {
            left = mid + 1;

        }
    }
    return longestDupSubstring;
};
function getSubstrings(s, windowLen) {
    let strings = new Set();
    for (let i = 0; (i + windowLen) <= s.length; i++) {
        // let from = i + 1;
        let substr = s.slice(i, (i + windowLen));
        if(strings.has(substr)) return substr;
        strings.add(substr)
        // if (s.indexOf(substr, from) !== -1) {
        //     return substr;
        // }
    }
    return "";
}

console.log(longestDupSubstring("banana"))