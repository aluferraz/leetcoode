/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
//O(N)
var mostCommonWord = function(paragraph, banned) {
    paragraph = paragraph.toLowerCase();
    paragraph = paragraph.replace(/([^\w\s])/g,' '); //Remove ponctuation 
    let maxOcurrences = 0;
    let hashCount = {};
    let commmonWord = "";
    const paragraphAsString = paragraph.split(' ');
    const bannedAsSet = new Set(banned);
    for(let i = 0; i < paragraphAsString.length; i++){
        const currentString = paragraphAsString[i].trim();
        if(currentString === '') continue;
        if(bannedAsSet.has(currentString)) continue;
        if(!(currentString in hashCount)){
            hashCount[currentString] = 0;    
        }
        hashCount[currentString]++;
        if(hashCount[currentString] >= maxOcurrences){
            commmonWord = currentString;
            maxOcurrences = hashCount[currentString];
        }
    }
    return commmonWord;
};