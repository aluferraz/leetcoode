/**
 * @param {number} n
 */

class Board {
    constructor(n) {
        this.size = n;
        this.clearBoard();
    }
    clearBoard() {
        this.board = Array(this.size)
            .fill()
            .map(() => { return Array(this.size).fill(0) })
        this.used = 0;
    }
    setMove(y, x, player) {
        if (this.board[y][x] !== 0) throw new Error('Invalid move');
        this.board[y][x] = player;
        this.used++;
        const movesRemaining = (this.size * this.size) - this.used;
        return movesRemaining;
    }
    getCell(row, col) {
        return this.board[row][col];
    }
    getSize() {
        return this.size;
    }
}

var TicTacToe = function (n) {
    this.board = new Board(n);
    this.playersInRow = Array(n).fill().map(() => { return {} });
    this.playersInCol = Array(n).fill().map(() => { return {} });;
    this.playersInDiag = {};
    this.playersInAntiDiag = {};
    this.buildDiag(n);
};
TicTacToe.prototype.buildDiag = function (n) {
    let diagonalIdxs = new Set();
    let currentKey = [0, 0];
    diagonalIdxs.add(currentKey.join('-'));
    for (let i = 0; i < n; i++) {
        currentKey[0]++;
        currentKey[1]++;
        diagonalIdxs.add(currentKey.join('-'));
    }
    this.diag = diagonalIdxs;

    //Anti Diag

    let antidiagonalIdxs = new Set();
    currentKey = [0, n - 1];
    antidiagonalIdxs.add(currentKey.join('-'));
    for (let i = 0; i < n; i++) {
        currentKey[0]++;
        currentKey[1]--;
        antidiagonalIdxs.add(currentKey.join('-'));
    }
    this.antiDiag = antidiagonalIdxs;
}
/** 
 * @param {number} row 
 * @param {number} col 
 * @param {number} player
 * @return {number}
 */
TicTacToe.prototype.move = function (row, col, player) {

    let movesRemaining = this.board.setMove(row, col, player);
    //What happens on tie? movesLeft === 0 ?
    return this.checkWin(row, col);
};
TicTacToe.prototype.checkWin = function (row, col) {
    let player = this.board.getCell(row, col);
    let size = this.board.getSize();
    //O(1)
    this.updateCount(this.playersInRow[row], player)
    if (this.playersInRow[row][player] === size) return player;
    this.updateCount(this.playersInCol[col], player)
    if (this.playersInCol[col][player] === size) return player;
    //Diagonal and Anti Diagonal
    let coordKey = row + '-' + col;
    let isDiag = this.diag.has(coordKey);
    if (isDiag) {
        this.updateCount(this.playersInDiag, player)
        if (this.playersInDiag[player] === size) return player;
    }
    let isAntiDiag = this.antiDiag.has(coordKey);
    if (isAntiDiag) {
        this.updateCount(this.playersInAntiDiag, player)
        if (this.playersInAntiDiag[player] === size) return player;
    }
    return 0;

    //O(N)
    // let win = this.checkHorizontal(row, col); //O(N)
    // if (win === 0) win = this.checkVertical(row, col); //O(N)
    // if (win === 0) win = this.checkDiagonally(row, col); //O(N)
    // return win;
}
TicTacToe.prototype.updateCount = function (countObj, player) {
    if (!(player in countObj)) {
        countObj[player] = 0;
    }
    countObj[player]++;
}
/*

TicTacToe.prototype.checkHorizontal = function (row, col) {
    const moves = [[0, 1], [0, -1]]; //Horizontal
    const player = this.board.getCell(row, col)
    return this.transverse(row, col, moves, player)
}
TicTacToe.prototype.checkVertical = function (row, col) {
    const moves = [[1, 0], [-1, 0]]; //Vertical
    const player = this.board.getCell(row, col)
    return this.transverse(row, col, moves, player)
}

TicTacToe.prototype.checkDiagonally = function (row, col) {
    const moveOne = [[1, 1], [-1, -1]]; //Diagonal One
    const moveTwo = [[-1, 1], [1, -1]]; //Diagonal Two
    const player = this.board.getCell(row, col)
    let resultOne = this.transverse(row, col, moveOne, player)
    let resultTwo = 0;
    if (resultOne === 0) {
        resultTwo = this.transverse(row, col, moveTwo, player)
    }
    return Math.max(resultOne, resultTwo)
}
TicTacToe.prototype.transverse = function (row, col, moves, player) {
    //Max four directions to explore
    let posOne = [row, col];
    let posTwo = [row, col];
    const size = this.board.getSize();

    let winner = 0;
    //we move at that direction and keep incrementing this counter every cell that we found the player
    //at the end, this should be equal to n
    let foundPlayer = { count: 1 };
    while (
        this.isValidIdx(posOne[0], posOne[1]) ||
        this.isValidIdx(posTwo[0], posTwo[1])
        // this.isValidIdx(posThree[0], posThree[1]) ||
        // this.isValidIdx(posFour[0], posFour[1])
    ) {
        //We go both sides of that direction to make it quicker
        //while the player is the winner on that direction, we keep expanding
        winner = this.moveDirecion(posOne, moves[0], player, foundPlayer);
        if (winner === player) {
            winner = this.moveDirecion(posTwo, moves[1], player, foundPlayer);
        }
        else break;

    }
    return foundPlayer.count === size ? winner : 0;
}
TicTacToe.prototype.moveDirecion = function (pos, moves, player, foundPlayer) {
    let winner = player;
    const direction = moves;
    pos[0] = pos[0] + direction[0];
    pos[1] = pos[1] + direction[1];
    if (this.isValidIdx(pos[0], pos[1])) { //Cell exists
        let playerInCell = this.board.getCell(pos[0], pos[1]);
        if (playerInCell !== player) { // Empty or another player
            pos[0] = -Infinity; //No more need to explore this direction
            pos[1] = -Infinity;
            winner = 0;
            return winner;
        } else {
            foundPlayer.count++;
        }
    }
    return winner;

}

TicTacToe.prototype.isValidIdx = function (row, col) {
    return row >= 0 && row < this.board.getSize() && col >= 0 && col < this.board.getSize();
}

/** 
 * Your TicTacToe object will be instantiated and called as such:
 * var obj = new TicTacToe(n)
 * var param_1 = obj.move(row,col,player)
 */


let ticTacToe = new TicTacToe(3);
console.log((ticTacToe.move(0, 0, 1)));
console.log((ticTacToe.move(0, 2, 2)));
console.log((ticTacToe.move(2, 2, 1)));
console.log((ticTacToe.move(1, 1, 2)));
console.log((ticTacToe.move(2, 0, 1)));
console.log((ticTacToe.move(1, 0, 2)));
console.log((ticTacToe.move(2, 1, 1)));