/**
 * @param {string[]} words
 */

const endingSymbol = '*';
var WordFilter = function (words) {
    this.suffixTrie = {};
    this.prefixTrie = {};
    for (let i = 0; i < words.length; i++) {
        this.buildTrie(words[i], i, this.prefixTrie)
    }
    for (let i = 0; i < words.length; i++) {
        this.buildTrie(words[i].split('').reverse().join(''), i, this.suffixTrie)
    }
};

/** 
 * @param {string} pref 
 * @param {string} suff
 * @return {number}
 */
WordFilter.prototype.f = function (pref, suff) {
    let prefMatches = this.searchTrie(pref, this.prefixTrie);
    let suffMatches = this.searchTrie(suff.split('').reverse().join(''), this.suffixTrie);
    let maxIdx = -1;
    for (let match of prefMatches) {
        let [word, idx] = match;
        let reversed = word.split('').reverse().join('');
        if (suffMatches.has(reversed)) {
            maxIdx = Math.max(maxIdx, idx)
        }
    }
    return maxIdx;
};

WordFilter.prototype.searchTrie = function (word, trie) {
    let current = trie;
    let left = 0;
    while (left < word.length) {
        if (!(word[left] in current)) return new Map();
        current = current[word[left]];
        left++;
    }
    return current.words;

}

WordFilter.prototype.buildTrie = function (word, idx, trie) {
    let left = 0;
    let node = trie;

    while (left < word.length) {
        let letter = word[left];
        if (!(letter in node)) {
            node[letter] = {
                words: new Map([[word, idx]])
            };
        } else {
            node[letter].words.set(word, idx);
        }
        node = node[letter];
        left++;
    }
    node[endingSymbol] = true;
}

/** 
 * Your WordFilter object will be instantiated and called as such:
 * var obj = new WordFilter(words)
 * var param_1 = obj.f(pref,suff)
 */

let wordFilter = new WordFilter(["abbba", "abba"]);
console.log((wordFilter.f("ab", "ba")));