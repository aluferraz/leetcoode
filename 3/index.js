/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    if (s.length === 0) return "";
    let left = 0;
    let right = 0;
    let setOfChars = new Set();
    let maxLength = 1;
    while (right < s.length) {
        let rightLetter = s[right];
        //We need to keep shortening the left pointer
        while (setOfChars.has(rightLetter) && left < right) {
            let leftLetter = s[left];
            setOfChars.delete(leftLetter);
            left++;
            if (!(setOfChars.has(rightLetter))) {
                break; // Resume window
            }
        }
        setOfChars.add(rightLetter);
        maxLength = Math.max(maxLength, setOfChars.size);
        right++;
    }
    return maxLength;

};

console.log(lengthOfLongestSubstring("abcabcbb"))