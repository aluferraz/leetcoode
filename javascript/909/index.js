/**
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function (board) {
    let queue = [];
    const boardSize = board.length;
    const target = boardSize * boardSize;


    queue.push({
        pos: 1,
        moves: 0
    });
    let visited = new Set();
    while (queue.length > 0) {
        let size = queue.length;
        for (let i = 0; i < size; i++) {
            let cellObj = queue.shift();
            let currentPos = cellObj.pos;
            let currentMoves = cellObj.moves;
            if (currentPos === target) return currentMoves;
            if (visited.has(currentPos)) continue;
            visited.add(currentPos);
            let maxMove = Math.min(currentPos + 6, (boardSize * boardSize))
            for (let i = currentPos + 1; i <= maxMove; i++) {
                let [row, col] = labelToPos(i, boardSize)
                let boardValue = board[row][col];
                let destination = i;
                if (boardValue !== -1) destination = boardValue;
                queue.push({
                    pos: destination,
                    moves: currentMoves + 1
                })
            }
        }
    }
    return -1;
};

function labelToPos(label, size) {
    let labelAsIdx = label - 1;
    let isForwardIndicator = (size - 1) % 2;
    let row = size - Math.ceil(label / size);
    let isBackwards = row % 2 !== isForwardIndicator;
    let col = labelAsIdx % size;
    if (isBackwards) {
        col = size - 1 - col;
    }
    return [row, col]

}
snakesAndLadders([[-1,-1],[-1,3]])
//snakesAndLadders([[-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1], [-1, 35, -1, -1, 13, -1], [-1, -1, -1, -1, -1, -1], [-1, 15, -1, -1, -1, -1]])

//snakesAndLadders([[-1, -1, -1, -1, 48, 5, -1], [12, 29, 13, 9, -1, 2, 32], [-1, -1, 21, 7, -1, 12, 49], [42, 37, 21, 40, -1, 22, 12], [42, -1, 2, -1, -1, -1, 6], [39, -1, 35, -1, -1, 39, -1], [-1, 36, -1, -1, -1, -1, 5]]);

/**
 * [
 * [-1,-1,-1],
 * [-1,9,8],
 * [-1,8,9]
 * ]*/