/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isConnected) {
    let visited = new Set();
    let provinces = { total: isConnected.length };
    for (let i = 0; i < isConnected.length; i++) {
        dfs(isConnected, i, visited, provinces);
    }
    return provinces.total;
};


function dfs(graph, i, visited, provinces) {
    visited.add(i);
    for (let j = 0; j < graph[i].length; j++) {
        if (j === i) continue; //Would self loop
        if (visited.has(j)) continue; //Already explored
        if (graph[i][j] === 1) {
            provinces.total--;
            dfs(graph, j, visited, provinces);
        }

    }
}
//findCircleNum([[1,0,0],[0,1,0],[0,0,1]])