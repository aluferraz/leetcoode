/**
 * @param {string} s
 * @return {string}
 */
 var longestPalindrome = function(s) {
    if(s.length === 0) return s;
    let longestPalindromeString = s[0];
    for(let i = 0; i < s.length; i++){
        const longestEvenPalindrome = longestPalindromeExpand(s,i,i);
        const longestOddPalindrome = longestPalindromeExpand(s,i,i+1);
        if(longestEvenPalindrome.length >= longestPalindromeString.length)
            longestPalindromeString = longestEvenPalindrome;
        if(longestOddPalindrome.length >= longestPalindromeString.length)
            longestPalindromeString = longestOddPalindrome;
    }
    return longestPalindromeString;
};

function longestPalindromeExpand(s,left,right){
    
    while(left <= right && left >= 0 && right < s.length){
        if(s[left] !== s[right] ){ 
            break;
        }
        left--; right++;        
    }
    return s.slice(left+1, right);
}
