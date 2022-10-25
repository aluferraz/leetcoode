/**
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function (board) {

    let stack = [];
    let n = board.length;
    if (n === 0) return 0;
    let maxReachArray = maxReachBoard(board);
    let target = n * n;

    stack.push([1, 0, false]);

    let visited = new Map();
    let minMovements = Infinity;

    while (stack.length > 0) {
        let size = stack.length;
        for (let i = 0; i < size; i++) {
            let currentTupple = stack.shift(); //O(N) in js better use LL
            let currentPos = currentTupple[0];
            let currentMoves = currentTupple[1];
            let followedLadderOrSnake = currentTupple[2];
            if (visited.has(currentPos)) {
                let movesAtVisit = visited.get(currentPos);
                if (movesAtVisit[0] <= currentMoves && followedLadderOrSnake === movesAtVisit[1]) //We only revisit if is a shorter path
                    continue;
            }
            visited.set(currentPos, [currentMoves, followedLadderOrSnake]);

            let reachable = Math.abs(maxReachArray[currentPos]);
            if (maxReachArray[currentPos] > 0) {
                if (!followedLadderOrSnake) {
                    //Ladder
                    let destination = maxReachArray[currentPos]
                    stack.push([destination, (currentMoves), true]);
                    continue;
                }
                reachable = Math.min(currentPos + 6, target);
            }
            if (currentPos === target) {
                minMovements = Math.min(currentMoves, minMovements);
            }
            //Regular cell, let's queue it's reachable 

            for (let i = currentPos + 1; i <= reachable; i++) {
                stack.push([i, currentMoves + 1, false])
            }

        }
    }
    return minMovements === Infinity ? -1 : minMovements;

};

function maxReachBoard(board) {
    let maxReachArray = [0];
    let lastRowIdx = board.length - 1;
    let forwardIndicator = lastRowIdx % 2;
    for (let i = lastRowIdx; i >= 0; i--) {
        let isRowBackwards = i % 2 !== forwardIndicator;
        let col = board[i].length;
        for (let j = 0; j < board[i].length; j++) {
            if (isRowBackwards) {
                col--;
            }
            else {
                col = j;
            }
            let currentReach = 0;
            if (board[i][col] === -1) {
                let cellId = maxReachArray.length;
                currentReach = Math.min((cellId + 6), (board.length * board.length))
                currentReach = currentReach * -1; // To make it easier to identify that wasn't a ladder or snake
            } else {
                currentReach = (board[i][col]);
            }
            maxReachArray.push(currentReach)

        }
    }
    return maxReachArray;
}

/**
 * [
 * [-1,-1,-1],
 * [-1,9,8],
 * [-1,8,9]
 * ]*/