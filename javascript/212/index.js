/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */

const STATUS = {
    VISITING: -1,
    VISITED: 1
}
const DIRECTIONS = {
    UP: [-1, 0],
    DOWN: [1, 0],
    LEFT: [0, -1],
    RIGHT: [0, 1]
}
const endingSymbol = '*';
var findWords = function (board, words) {
    //debugger;
    let trie = initSuffixTrie(words);
    let boardVisited = board.map((line) => { return line.slice().fill(0) }); //O(N) T/S


    let currentResult = new Set();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            searchSuffixTrieHelper(trie, [i, j], board, boardVisited, currentResult)
            if (currentResult.size === words.length) return Array.from(currentResult.keys());
        }

    }

    return Array.from(currentResult.keys());
};

//O(N^2 ) T // O(N)S
function initSuffixTrie(words) {
    let trie = {
    };
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let current = trie;
        for (let j = 0; j < word.length; j++) {
            const currentLetter = word[j];
            if (!(currentLetter in current)) {
                current[currentLetter] = {};
            }
            current = current[currentLetter];

        }
        current[endingSymbol] = true;
        current.word = word;
    }
    return trie;
}
//O(N^2)
function searchSuffixTrieHelper(runningTrie, position, board, boardVisited, currentResult) {

    let currentRow = position[0];
    let currentCol = position[1];
    let currentLetter = board[currentRow][currentCol];
    if (
        boardVisited[currentRow][currentCol] === STATUS.VISITING // Callstack
    ) return;

    boardVisited[currentRow][currentCol] = STATUS.VISITING;

    if (!(currentLetter in runningTrie)) {
        boardVisited[currentRow][currentCol] = STATUS.VISITED;
        return;
    }
    runningTrie = runningTrie[currentLetter];
    if (endingSymbol in runningTrie && !currentResult.has(runningTrie.word)) {
        currentResult.add(runningTrie.word);
    }

    for (let direction in DIRECTIONS) {
        const movement = DIRECTIONS[direction];
        const newRow = currentRow + movement[0];
        const newCol = currentCol + movement[1]
        if (isValidIdx(newRow, newCol, board)) {
            searchSuffixTrieHelper(runningTrie, [newRow, newCol], board, boardVisited, currentResult);
        }
    }

    boardVisited[currentRow][currentCol] = STATUS.VISITED;
}

function isValidIdx(y, x, array) {
    return y >= 0 && y < array.length && x >= 0 && x < array[y].length;
}

findWords([["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]],
    ["oath", "pea", "eat", "rain", "oathi", "oathk", "oathf", "oate", "oathii", "oathfi", "oathfii"])
//[["a","b"],["c","d"]]
//["abcb"]
// findWords([["a"]], ["a"]);