/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
//Test it with aaaabab [a,b]
const endingSymbol = '*';
var wordBreak = function (s, wordDict) {

    if (s.length === 0) return [];
    let wordsTrie = {};
    for (let i = 0; i < wordDict.length; i++) {
        buildTrie(wordsTrie, wordDict[i]);
    }
    let result = [];
   // debugger;
    backtrackResults(s, wordsTrie, wordsTrie, 0, [], result);

    return result;
};

function buildTrie(trie, word) {
    let pointer = trie;
    for (let i = 0; i < word.length; i++) {
        let currentLetter = word[i];
        if (!(currentLetter in pointer)) {
            pointer[currentLetter] = {};
        }
        pointer = pointer[currentLetter];
    }
    pointer[endingSymbol] = true;
    pointer.word = word;
}

function backtrackResults(target, runningTrie, wordsTrie, i, currentResult, result) {
    let currentLetter = target[i];
    if (i === target.length && currentResult.join("") === target) { //We made it to the end of the string
        result = result.push(currentResult.join(" "));
        return true;
    }
    if (!(currentLetter in runningTrie)) {
        return false;
    }
    runningTrie = runningTrie[currentLetter];
    if (endingSymbol in runningTrie) {
        //here we have two cases:
        //1: Use this word and reset the trie to the beggining
        //or
        //2: we can skip this words to see if this is a word contained in another word
        currentResult.push(runningTrie.word);// Used word
        //Case 1
        backtrackResults(target, wordsTrie, wordsTrie, (i + 1), currentResult, result)
        //Case 2
        currentResult.pop();
        backtrackResults(target, runningTrie, wordsTrie, (i + 1), currentResult, result)
    } else {
        backtrackResults(target, runningTrie, wordsTrie, (i + 1), currentResult, result)
    }

}
wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"])
/**
 * [a,b,bc,ba]
 * {
 *  a: { '*' : true, word: "a"} 
 *  b: {
 *      '*' : true,
 *      word: "b",
 *       c: {'*' : true, word: "bc"}
 *       a: { '*' : true, word: "ba" }
 *     },
 * }
 *
 * target = "aaaba"
 * 
 * running = [a, a, a]
 * result = ["a a a b a","a a a ba"]
 */