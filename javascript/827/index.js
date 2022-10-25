/**
 * @param {number[][]} grid
 * @return {number}
 */
class IslandScore {
    constructor(score = 0) {
        this.score = score;
    }
}

var largestIsland = function (grid) {
    let scores = grid.slice().map((row) => { return Array(row.length).fill(new IslandScore()) });
    findLongestIsland(grid, scores);
    let hotspot = findHotspot(grid, scores);
    let debug = scores.map((row) => { return row.map((cell) => { return cell.score }) });
    let [hotY, hotX] = hotspot;
    grid[hotY][hotX] = 1;
    return findLongestIsland(grid, scores);
};

function findLongestIsland(grid, scores) {
    let longestIsland = 0;
    let visited = grid.slice().map((row) => { return Array(row.length).fill(false) });
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let cell = grid[i][j];
            if (cell === 1 && visited[i][j] === false) {
                let currentIsland = dfs(grid, i, j, visited, scores, new IslandScore(0));
                longestIsland = Math.max(longestIsland, currentIsland.score);
            }
        }
    }
    return longestIsland;
}

function dfs(grid, y, x, visited, scores, scoreObj) {
    if (!isValidIdx(y, x, grid)) return 0;
    if (visited[y][x]) return 0;
    if (grid[y][x] === 0) return 0;
    visited[y][x] = true;
    scoreObj.score++;
    dfs(grid, y - 1, x, visited, scores, scoreObj);
    dfs(grid, y + 1, x, visited, scores, scoreObj);
    dfs(grid, y, x - 1, visited, scores, scoreObj);
    dfs(grid, y, x + 1, visited, scores, scoreObj);
    scores[y][x] = scoreObj;
    return scoreObj;
}

function findHotspot(grid, scores) {
    let hotspot = [0, 0, 0]; //y,x,score
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let cell = grid[i][j];
            if (cell === 0) {
                let score = 1;
                //check up,down,left,right for bridges
                let usedScores = new Set();
                if (isValidIdx(i - 1, j, grid) && grid[i - 1][j] >= 1) {
                    let islandScore = scores[i - 1][j];
                    if (!usedScores.has(islandScore)) {
                        score += islandScore.score;
                        usedScores.add(islandScore);
                    }
                }
                if (isValidIdx(i + 1, j, grid) && grid[i + 1][j] >= 1) {
                    let islandScore = scores[i + 1][j];
                    if (!usedScores.has(islandScore)) {
                        score += islandScore.score;
                        usedScores.add(islandScore);
                    }
                }
                if (isValidIdx(i, j - 1, grid) && grid[i][j - 1] >= 1) {
                    let islandScore = scores[i][j - 1];
                    if (!usedScores.has(islandScore)) {
                        score += islandScore.score;
                        usedScores.add(islandScore);
                    }
                }
                if (isValidIdx(i, j + 1, grid) && grid[i][j + 1] >= 1) {
                    let islandScore = scores[i][j + 1];
                    if (!usedScores.has(islandScore)) {
                        score += islandScore.score;
                        usedScores.add(islandScore);
                    }
                }
                if (score >= hotspot[2]) {
                    hotspot = [i, j, score];
                }
            }
        }
    }
    return hotspot;
}

function isValidIdx(y, x, grid) {
    return y >= 0 && y < grid.length && x >= 0 && x < grid[y].length;
}



const { Queue } = require('../IMPORT_CLASSES/node_modules/@datastructures-js/queue');

console.log(largestIsland([
    [1, 0, 1, 0, 1],
    [0, 1, 1, 0, 1],
    [1, 1, 1, 0, 0],
    [1, 0, 1, 1, 1],
    [0, 0, 1, 1, 0]]
));