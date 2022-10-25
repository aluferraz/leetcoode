/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function (n, edges) {
    let connectionsMap = buildConnectionsMap(edges);
    let visited = new Set();
    let result = 0;
   // debugger;
    for (let i = 0; i < n; i++) {
        if (visited.has(i)) continue; // Was counted
        if (connectionsMap.has(i)) {
            const discoveredNodes = exploreConnectionsDFS(i, connectionsMap, visited);
            if (discoveredNodes > 0) result++;
        } else {
            //No connections is a solo graph
            visited.add(i); // This graph is undirected, but it is safe to make the code good for directed graphs as well
            result++;
        }

    }
    return result;
};

function buildConnectionsMap(edges) {
    let connectionsMap = new Map();

    for (let i = 0; i < edges.length; i++) {
        const currentEdge = edges[i][0];
        const connection = edges[i][1];
        if (!connectionsMap.has(currentEdge)) {
            connectionsMap.set(currentEdge, new Set());
        }
        if (!connectionsMap.has(connection)) {
            connectionsMap.set(connection, new Set());
        }
        const edgeSet = connectionsMap.get(currentEdge).add(connection);
        connectionsMap.set(currentEdge, edgeSet);
        //as it is undirected the connections is also related with the current
        const connectionSet = connectionsMap.get(connection).add(currentEdge);
        connectionsMap.set(connection, connectionSet);
    }
    return connectionsMap;

}

function exploreConnectionsDFS(currentEdge, connectionsMap, visited) {
    if (visited.has(currentEdge)) return 0;
    visited.add(currentEdge);
    let discovered = 1; //Current edge is discovered now
    if (!connectionsMap.has(currentEdge)) return discovered;
    const connections = connectionsMap.get(currentEdge);

    for (let connection of connections) {
        discovered += exploreConnectionsDFS(connection, connectionsMap, visited)
    }
    return discovered;
}

countComponents(2, [[1, 0]])