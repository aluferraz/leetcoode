/**
 * @param {character[][]} grid
 * @return {number}
 */
const startingSymbol = '*';
const blockCell = 'X';
const foodCell = '#';
const DIRECTIONS = {
    UP: [-1, 0],
    DOWN: [1, 0],
    LEFT: [0, -1],
    RIGHT: [0, 1]
}
var getFood = function (grid) {
    
    let startingPos = findStartPosition(grid);
    let queue = []; // In js no native queue, must implement using LL
    queue.push(startingPos);
    let visited = grid.slice().map((el) => { return el.slice().fill(0) });
    let moves = 0;
    while (queue.length > 0) {
        let size = queue.length;
        for (let i = 0; i < size; i++) {
            let [row, col] = queue.shift();
            if (visited[row][col] === 1) continue;
            if (grid[row][col] === foodCell) return moves;
            visited[row][col] = 1;
            for (let direction in DIRECTIONS) {
                let newRow = row + DIRECTIONS[direction][0];
                let newCol = col + DIRECTIONS[direction][1];
                if (isValidIdx(newRow, newCol, grid)) {
                    queue.push([newRow, newCol])
                }
            }
        }
        moves++;
    }
    return -1;

};

function findStartPosition(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === startingSymbol) return [i, j]
        }
    }
    return [0, 0];
}
function isValidIdx(y, x, grid) {
    return y >= 0 && y < grid.length && x >= 0 && x < grid[y].length && grid[y][x] !== blockCell;

}