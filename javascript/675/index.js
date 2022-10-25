/**
 * @param {number[][]} forest
 * @return {number}
 */

const DIRECTIONS = { UP: [-1, 0], DOWN: [1, 0], LEFT: [0, -1], RIGHT: [0, 1] };


var cutOffTree = function (forest) {
    pq = new MinPriorityQueue();
    let totalTrees = setForestPrio(forest, pq);


    let cur = [0, 0];
    let total = 0;
    while (pq.size() !== 0) {
        let target = pq.dequeue();
        let steps = bibfs(cur, target.element, forest);
        if (steps === -1) return -1;
        totalTrees--;
        total += steps;
        cur = [target.element[0], target.element[1]];
    }
    return totalTrees === 0 ? total : -1;
};
function setForestPrio(forest, pq) {
    let totalTrees = 0;
    forest.map((row, i) => {
        // let prioRow = [];
        row.map(
            (col, j) => {
                let cost = forest[i][j];
                let tuple = [i, j, cost];
                if (cost > 1) {
                    pq.enqueue(tuple, cost);
                    totalTrees++;
                }
            }
        )
        // forestPrio.push(prioRow);
    });
    return totalTrees;
}


function bibfs(pos, tar, matrix) {
    let queueOne = new Queue();
    let queueTwo = new Queue();
    let [y, x] = pos;
    let stepsOne = 0;

    queueOne.enqueue(pos);
    let visitedOne = new Set();
    visitedOne.add(pos.join(','));
    let visitedTwo = new Set();
    visitedTwo.add([tar[0], tar[1]].join(','));


    queueTwo.enqueue([tar[0], tar[1]]);

    while (queueOne.size() > 0 && queueTwo.size() > 0) {
        let size = queueOne.size();
        for (let i = 0; i < size; i++) {
            [y, x] = queueOne.dequeue();
            if (visitedOne.has([tar[0], tar[1]].join(','))) {
                return stepsOne;
            }
            enqueueNeighboors([y, x], matrix, queueOne, visitedOne);
        }
        stepsOne++;

        size = queueTwo.size();
        for (let i = 0; i < size; i++) {
            [y, x] = queueTwo.dequeue();
            if (visitedOne.has([y, x].join(','))) {
                return stepsOne;
            }
            if (enqueueNeighboors([y, x], matrix, queueTwo, visitedTwo, visitedOne)) {
                return stepsOne + 1;
            }
        }
        stepsOne++;


    }

    return -1;
}

function enqueueNeighboors(pos, matrix, queue, visited, crossCheck = null) {
    for (let direction in DIRECTIONS) {
        let movement = DIRECTIONS[direction];
        let newY = pos[0] + movement[0];
        let newX = pos[1] + movement[1];
        let newCoords = [newY, newX];
        let setKey = [newY, newX].join(',');
        if (
            isValidIdx(newY, newX, matrix) &&
            !isObstacle(matrix[newY][newX]) &&
            !visited.has(setKey)
        ) {
            queue.enqueue(newCoords);
            visited.add(setKey);
            if (crossCheck !== null && crossCheck.has(setKey)) {
                return true;
            }
        }
    }
    return false;
}

function isObstacle(val) {
    return val === 0;
}

function isValidIdx(y, x, matrix) {
    return y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length;
}

const { MinPriorityQueue } = require('../IMPORT_CLASSES/node_modules/@datastructures-js/priority-queue')
const { Queue } = require('../IMPORT_CLASSES/node_modules/@datastructures-js/queue');
console.log(cutOffTree(
    [[54581641, 64080174, 24346381, 69107959], [86374198, 61363882, 68783324, 79706116], [668150, 92178815, 89819108, 94701471], [83920491, 22724204, 46281641, 47531096], [89078499, 18904913, 25462145, 60813308]]
))

