//38 min first;
//48 min working
const endingSymbol = '*';
//O (w*c^2) -> words * longest word in array
// O (w*c) space
// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab
// aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaac
var findAllConcatenatedWordsInADict = function (words) {
    const trie = buildTrie(words);
    let result = [];
    for (let i = 0; i < words.length; i++) {
        const currentWord = words[i];
        findConcatenedRecursive(trie, currentWord, 0, result);
    }
    return result;
};


function findConcatenedRecursive(trie, currentWord, start, result, currentStack = []) {
    //debugger;
    let currentTriePointer = trie;
    let wordFound = [];
    if (start === currentWord.length) return true; // Base case;
    for (let j = start; j < currentWord.length; j++) {
        const currentLetter = currentWord[j];
        if (currentLetter in currentTriePointer) {
            wordFound.push(currentLetter);
            currentTriePointer = currentTriePointer[currentLetter];
            if (currentTriePointer[endingSymbol] === true) {
                currentStack.push(wordFound.join(''));
                const foundRemaning = findConcatenedRecursive(
                    trie,
                    currentWord,
                    j + 1,
                    result,
                    currentStack
                );
                if (foundRemaning === true &&
                    currentStack.length > 1 &&
                    currentStack.join('') === currentWord
                ) {
                    result.push(currentWord);
                } else {
                    currentStack.pop();
                }
            }
        }else{
            return false;
        }
    }
    return false;
}

//O(W*c)
function buildTrie(words) {
    const trie = {};
    for (let i = 0; i < words.length; i++) {
        const currentWord = words[i];
        pushWordIntoTrie(currentWord, trie);
    }
    return trie;
}
//trie is passed by ref
function pushWordIntoTrie(word, trie) {
    let currentTriePointer = trie; //Root 
    for (let i = 0; i < word.length; i++) {
        const currentLetter = word[i];
        if (currentLetter in currentTriePointer) {
            currentTriePointer = currentTriePointer[currentLetter];
            continue;
        }
        currentTriePointer[currentLetter] = {};
        currentTriePointer = currentTriePointer[currentLetter];
    }
    currentTriePointer[endingSymbol] = true;
}