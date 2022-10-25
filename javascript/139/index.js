/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const endingSymbol = '*';
//t: O(N + W*L) / S: (N + W)
var wordBreak = function (s, wordDict) {
    if (s.length === 0 || wordDict.length === 0) return false;
    let trie = buildTrie(s); //O(n)
    let mapFirstLetter = buildFirstLetterMap(wordDict);//O(O(w*L))
    //Navigate trie, searching from complete words
    let letterIdx = 0;
    let cache = new Map();
    return canUseWords(trie, s, letterIdx, mapFirstLetter, "", cache);

};

function canUseWords(triePointer, s, idx, mapFirstLetter, fromWord, cache) {
    let cacheKey = idx + fromWord;
    if (cache.has(cacheKey)) {
        return cache.get(cacheKey)
    }
    if (idx === s.length) return true;
    let currentLetter = s[idx];
    if (!mapFirstLetter.has(currentLetter)) return false;
    let possibleWords = mapFirstLetter.get(currentLetter); //Words starting with this letter.

    for (let i = 0; i < possibleWords.length; i++) {
        let word = possibleWords[i];
        let found = true;
        let current = triePointer;
        let nextIdx = idx;
        for (let i = 0; i < word.length; i++) {
            let dictLetter = word[i];
            if (!(dictLetter in current)) {
                found = false;
                break;
            }
            current = current[dictLetter];
            nextIdx++;
        }
        //If found === true, it means that we can fit a whole dict word in our trie.
        if (found === true) {
            let isTheEndReacheable = canUseWords(current, s, nextIdx, mapFirstLetter, word, cache);
            if (isTheEndReacheable) {
                return true;
            }
            cache.set(idx + word, false);
        }
        cache.set(idx + word, false);

    }
    cache.set(idx + fromWord, false);
    return false;


}

function buildFirstLetterMap(wordDict) {
    let map = new Map();
    for (let i = 0; i < wordDict.length; i++) {
        let firstLetter = wordDict[i][0]; //Should validate invalid string?
        let wordsStartingWithLetter = [];
        if (map.has(firstLetter)) {
            wordsStartingWithLetter = map.get(firstLetter);
        }
        wordsStartingWithLetter.push(wordDict[i]);
        map.set(firstLetter, wordsStartingWithLetter);
    }
    return map;

}

function buildTrie(s) {
    let trie = {};
    let current = trie;
    for (let i = 0; i < s.length; i++) {
        let letter = s[i];
        if (!(letter in current)) {
            current[letter] = {};
        }
        current = current[letter];
    }
    current[endingSymbol] = true;
    return trie;
}
wordBreak(
    "aaaaaaa",
    ["aaaa","aa"]
)