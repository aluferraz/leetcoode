/*
 * @lc app=leetcode id=1293 lang=javascript
 *
 * [1293] Shortest Path in a Grid with Obstacles Elimination
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
 var shortestPath = function(grid, k) {
    let X = grid.length;
    let Y = grid[0].length;

    let visited = new Set();

    let q = new Queue();
    q.enqueue({ x: 0, y: 0, s: 0, o: 0 });
    while (q.size() !== 0) {
        let cur = q.dequeue();
        let coord = `${cur.x} ${cur.y} ${cur.o}`;
        if (cur.x < 0 || cur.x === X || cur.y < 0 || cur.y === Y || visited.has(coord)|| cur.o > k) {
            continue;
        }

        if (grid[cur.x][cur.y] === 1) {
            ++cur.o;
        }

        if (cur.x === X - 1 && cur.y === Y - 1) {
            return cur.s;
        }

        visited.add(coord);

        q.enqueue({ x: cur.x - 1, y: cur.y, s: cur.s + 1, o: cur.o });
        q.enqueue({ x: cur.x + 1, y: cur.y, s: cur.s + 1, o: cur.o });
        q.enqueue({ x: cur.x, y: cur.y - 1, s: cur.s + 1, o: cur.o });
        q.enqueue({ x: cur.x, y: cur.y + 1, s: cur.s + 1, o: cur.o });
    }
    return -1;
};
// @lc code=end

