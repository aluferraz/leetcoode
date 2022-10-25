/**
 * @param {string} palindrome
 * @return {string}
 */
var breakPalindrome = function (palindrome) {
    if (palindrome.length === 1) return "";
    palindrome = palindrome.split('');
    let found = false;
    let replacedIdx = -1;
    let originalLetter = "";

    let left = 0;
    let right = palindrome.length - 1;
    while (left < right) {
        if (palindrome[left] > 'a') {
            originalLetter = palindrome[left];
            palindrome[left] = 'a';
            replacedIdx = left;
            found = true;
            break;
        }
        left++;
        right--;
    }
    //Edge case 1: aa -> ab
    if (!found) { //O(1)
        replacedIdx = palindrome.length - 1;
        originalLetter = palindrome[replacedIdx];
        palindrome[replacedIdx] = 'b';
    }
    return palindrome.join(''); //O(N)
};

//[2,0,0,0]
// aa -> ab
// bbabb -> ababb
// ababa -> aaaba

// ab -> aa -> ac
// aab -> aaa -> aac
// aac -> aaa -> aab
// aaz -> aaa -> aab
//aba

console.log(breakPalindrome("aba"));