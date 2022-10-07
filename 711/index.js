/**
 * @param {number[][]} grid
 * @return {number}
 * 
 * 
 * 
UNFINISHED
 */

class Island {
    constructor() {
        // this.absolute = [];
        this.relative = {
            x: {},
            y: {},
        };
        this.coords = new Set();
        this.minX = Infinity;
        this.maxX = -Infinity;
        this.minY = Infinity;
        this.maxY = -Infinity;
    }
    getCounterKey() {
        // let keyMap = {};
        let missingBlocksToMakeSquare = [];
        for (let i = this.minY; i <= this.maxY; i++) {
            for (let j = this.minX; j <= this.maxX; j++) {
                let coordsKey = [Math.abs(i), Math.abs(j)].join();
                if (!this.coords.has(coordsKey)) {
                    missingBlocksToMakeSquare.push(coordsKey);
                }
            }
        }
        let key1 = missingBlocksToMakeSquare.join(" ")//this.serializeKey(keyMap);
        missingBlocksToMakeSquare = [];
        for (let i = this.minX; i <= this.maxX; i++) {
            for (let j = this.minY; j <= this.maxY; j++) {
                let coordsKey = [Math.abs(j), Math.abs(i)].join();
                if (!this.coords.has(coordsKey)) {
                    missingBlocksToMakeSquare.push(coordsKey);
                }
            }
        }
        // keyMap = {};
        let key2 = missingBlocksToMakeSquare.join(" ")
        // let key2 = this.serializeKey(keyMap);
        return [key1, key2];
    }

    serializeKey(keyMap) {
        //Serializes the number of lines needed to make a retangle
        let serialized = [];
        for (let key in keyMap) {
            let missingCoords = keyMap[key].join('&&');
            serialized.push([key, missingCoords].join(':'));
        }
        serialized.sort();
        return serialized.join('+');
    }

    updateKey(a, maxA, keyMap) {
        let aKey = maxA - a;
        let count = 0;
        if (keyMap.has(aKey)) {
            count = keyMap.get(aKey);
        }
        count++;
        keyMap.set(aKey, count);
    }



    insertRelative(coords) {
        let [row, col] = coords;
        if (!(col in this.relative.x)) {
            this.relative.x[col] = new Set();
        }
        this.relative.x[col].add(row);

        if (!(row in this.relative.y)) {
            this.relative.y[row] = new Set();
        }
        this.relative.y[row].add(col);
        this.updateMax(row, col);
        this.coords.add([Math.abs(row), Math.abs(col)].join());
    }
    updateMax(row, col) {
        this.maxX = Math.max(col, this.maxX);
        this.maxY = Math.max(row, this.maxY);
        this.minX = Math.min(col, this.minX);
        this.minY = Math.min(row, this.minY);
    }

}


var numDistinctIslands2 = function (grid) {
    let islandsSet = new Set();
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (isIsland(i, j, grid)) {
                let island = new Island();
                buildIsland(i, j, grid, island);
                let [counterKey1, counterKey2] = island.getCounterKey();
                if (!islandsSet.has(counterKey1) && !islandsSet.has(counterKey2)) {
                    islandsSet.add(counterKey1);
                }
            }

        }
    }
    return islandsSet.size;
};

function isValidIdx(i, j, grid) {
    return i >= 0 && i < grid.length && j >= 0 && j < grid[i].length;
}

function isIsland(i, j, grid) {
    return grid[i][j] === 1;
}
function buildIsland(i, j, grid, island, runningI = 0, runningJ = 0) {
    if (!isValidIdx(i, j, grid)) return;
    if (!isIsland(i, j, grid)) return;
    grid[i][j] = 'X'; //Visited
    // island.absolute.push([i, j]);
    island.insertRelative([runningI, runningJ]);
    buildIsland(i, j + 1, grid, island, runningI, runningJ + 1);
    buildIsland(i, j - 1, grid, island, runningI, runningJ - 1);
    buildIsland(i + 1, j, grid, island, runningI + 1, runningJ);
    buildIsland(i - 1, j, grid, island, runningI - 1, runningJ);
}

console.log(numDistinctIslands2([[1, 1, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 1], [0, 0, 0, 1, 1]]));