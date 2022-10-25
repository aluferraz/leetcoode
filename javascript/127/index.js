/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
//wordList[i].length == beginWord.length
//T: O(M²N)  S: O(M.N)

var ladderLength = function (beginWord, endWord, wordList) {
    const wordListAsSet = new Set(wordList);
    if (!wordListAsSet.has(endWord)) return 0;
    let stack = [];
    stack.push(beginWord);

    const wordsSeen = new Set();
    let steps = 0;
    let found = false;
    
    while (stack.length > 0) {
        let size = stack.length;
        for (let i = 0; i < size; i++) {
            const currentWord = stack.shift(); //O(n) -> DLinklist would be better;
            if(currentWord === endWord){
                stack = [];
                found = true;
                break;
            }
            if(wordsSeen.has(currentWord)) continue;
            wordsSeen.add(currentWord);
            pushCombinations(currentWord, wordListAsSet, wordsSeen, stack)
            
        }
        steps++;
    }
    return found ? steps : 0;

};


function pushCombinations(word, wordListAsSet, wordsSeen,stack) {
    const alphabet = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ];
    for (let i = 0; i < word.length; i++) {
        let newWord = word.split('');
        for (let j = 0; j < alphabet.length; j++) { //O(26) -> O(1)
            newWord[i] = alphabet[j];
            const newWordStr = newWord.join('');
            if (wordListAsSet.has(newWordStr) && !wordsSeen.has(newWordStr) ) {
                stack.push(newWordStr);
            }
        }
    }
}
ladderLength("hot","dog",["hot","dog","dot"])
