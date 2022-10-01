/**
 * @param {string[]} words
 * @return {string}
 */

const endingSymbol = '*';

const [VISITING, VISITED] = [-1, 1]

var alienOrder = function (words) {
    if (words.length === 0) return "";
    let graph = buildGraph(words);
    if (graph === false) return "";
    let distinctLetters = getDistinctLetters(words);
    let result = [];
    let visited = new Map();
    for (let letter of distinctLetters) {
        exploreGraph(graph, letter, visited, result)
    }

    return result.length === distinctLetters.size ? result.reverse().join('') : "";
};

function exploreGraph(graph, letter, visited, result) {
    if (visited.has(letter)) {
        let state = visited.get(letter);
        if (state === VISITING) return false;
        return true;
    }
    if (!(letter in graph)) {
        result.push(letter);
        visited.set(letter, VISITED);
        return true;
    }
    visited.set(letter, VISITING);
    let letterPreq = graph[letter];
    for (let i = 0; i < letterPreq.length; i++) {
        let preReq = letterPreq[i];
        if (exploreGraph(graph, preReq, visited, result) === false) {
            return false;
        }
    }
    result.push(letter);
    visited.set(letter, VISITED);
    return true;
}

function buildGraph(words) {
    let letterGraph = {};

    for (let i = 1; i < words.length; i++) {
        let word = words[i];
        let prevWord = words[i - 1];
        let len = Math.min(word.length, prevWord.length);
        if (prevWord.startsWith(word) && prevWord.length > word.length) return false;
        for (let j = 0; j < len; j++) {
            let firstLetter = prevWord[j];
            let secondLetter = word[j];
            if (firstLetter !== secondLetter) {
                if (!(firstLetter in letterGraph)) {
                    letterGraph[firstLetter] = [];
                }
                letterGraph[firstLetter].push(secondLetter);
                break;
            }
        }
    }
    return letterGraph;
}
function getDistinctLetters(words) {
    let distinctLetters = new Set();
    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < words[i].length; j++) {
            distinctLetters.add(words[i][j]);
        }
    }
    return distinctLetters;
}
console.log(alienOrder(["abc", "ab"]))