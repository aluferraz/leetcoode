//TODO: Try memoization
//You can visit the same node, but you cannot change it's direction twice.
/**
 * @param {number[][]} grid
 * @return {number}
 */
const DIRECTIONS = [
    [0, 1],// Right,
    [0, -1],// left,
    [1, 0],// down,
    [-1, 0],// up,
]
// const VISITING = -1;
// const VISITING_CHANGED = -2;
var minCost = function (grid) {
    let stack = [];
    let currentPos = [0, 0, 0];
    stack.push(currentPos);
    let costArray = [];
    for (let i = 0; i < grid.length; i++) {
        let costLine = Array(grid[i].length).fill(Infinity);
        costArray.push(costLine);
    }
    //debugger;
    while (stack.length > 0) {
        //  debugger;
        let size = stack.length;
        for (let i = 0; i < size; i++) {
            let currentCell = stack.shift(); //O(N) in js, would be better to use a LL
            let currentY = currentCell[0];
            let currentX = currentCell[1];
            let currentCost = currentCell[2];
            // if (costArray[currentY][currentX] === VISITING_CHANGED) continue;
            if (currentCost >= costArray[currentY][currentX]) continue;
            const currentDirection = grid[currentY][currentX] - 1;
            costArray[currentY][currentX] = currentCost;
            //Base case
            if (currentY === (grid.length - 1) && currentX === (grid[currentY].length - 1)) {
                costArray[currentY][currentX] = currentCost;
                if (currentCost === 0) break;
                continue;
            }

            for (let i = currentDirection; i < (DIRECTIONS.length * 2); i++) {
                let circularIdx = i % DIRECTIONS.length;
                let newDirection = DIRECTIONS[circularIdx];
                let associatedCost = currentDirection === i ? 0 : 1;
                let newY = newDirection[0] + currentY;
                let newX = newDirection[1] + currentX;
                if (validIdx(newY, newX, grid)) {
                    stack.push([newY, newX, (currentCost + associatedCost)])
                }


                if (((i + 1) % DIRECTIONS.length) === (currentDirection)) break; // full loop
            }

        }
    }
    let rightBellowConnerCost = costArray[grid.length - 1][grid[grid.length - 1].length - 1];
    return rightBellowConnerCost;


};

function validIdx(y, x, grid) {
    return y >= 0 && y < grid.length && x >= 0 && x < grid[y].length;
}