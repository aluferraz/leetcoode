/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
 var exist = function (board, word) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let letter = board[i][j];
            if (letter === word[0]) {
                if (dfs([i, j, i, j], word, 0, board, new Set())) {
                    return true;
                }
            }
        }
    }
    return false;

};
function isValidIdx(y, x, matrix) {
    return y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length;
}
function dfs(pos, s, i, matrix, visited) {
    let [y, x] = pos;
    let key = [y, x].join();
    if (i === s.length) return true;
    if (!isValidIdx(y, x, matrix)) return false;
    if (visited.has(key)) { //Cannot use same letter twice
     
        return false;
    }
    visited.add(key);
    let target = s[i];
    let letter = matrix[y][x];

    if (letter !== target) {
        visited.delete(key); //Stack only
        return false;
    }
    let found = dfs([y + 1, x, y, x], s, i + 1, matrix, visited); //Down
    if (!found) found = dfs([y - 1, x, y, x], s, i + 1, matrix, visited); //up
    if (!found) found = dfs([y, x + 1, y, x], s, i + 1, matrix, visited); //right
    if (!found) found = dfs([y, x - 1, y, x], s, i + 1, matrix, visited); //left
    
    visited.delete(key);//Stack only
    return found;

}