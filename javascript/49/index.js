/**
 * @param {string[]} strs
 * @return {string[][]}
 */
// O(N * slog(s) )
// O(N)
var groupAnagrams = function(strs) {
    let existing = {};
    for(let i = 0; i < strs.length; i++){
        let currentWord = strs[i];
        currentWord = currentWord.split('').sort().join('');
        if( currentWord in existing ){
            existing[currentWord].push( strs[i] );
        }else{
            existing[currentWord] = [strs[i]];
        }
    }
    let result = [];
    for( let anagram in existing ){
        result.push( existing[anagram] )
    };
    return result;
};