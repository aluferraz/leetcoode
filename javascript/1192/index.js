/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
 var criticalConnections = function(n, connections) {
    if(connections.length === 0) return connections;
    const current = 0;
    const parent  = -1;
    const currentTime = 0;
    const arrivalTimes = {};
    let criticals = [];
    const connectionsAdjacentList = {};
    //Turn this into an adjacent list to be easier to implement Tarjan's 
    for(let i = 0; i< connections.length; i++){
        const currentConnection = connections[i];
        const currentConnectionIdx = currentConnection[0];
        const destination = currentConnection[1];
        if( ! (currentConnectionIdx in connectionsAdjacentList)  ){
            connectionsAdjacentList[currentConnectionIdx]  = [];
        }
        if( ! (destination in connectionsAdjacentList)  ){
            connectionsAdjacentList[destination]  = [];
        }
        connectionsAdjacentList[currentConnectionIdx].push(destination);
        connectionsAdjacentList[destination].push(currentConnectionIdx);
    }
    
    
    
    dfs(current, parent,currentTime, arrivalTimes, connectionsAdjacentList, criticals);
    
    return criticals;
};

function dfs(current, parent,currentTime, arrivalTimes, connections, criticals ){
    let minimumArrivalTime = currentTime ;
    arrivalTimes[current] = minimumArrivalTime;
    const vertexConnections = connections[current];
    for(let i = 0; i < vertexConnections.length; i++){
        const destination = vertexConnections[i];
        if(destination === parent || destination === current ) continue; //We don't need to look the way we came.
        if(destination in arrivalTimes){
            minimumArrivalTime = Math.min(minimumArrivalTime,arrivalTimes[destination]);
        }else{
            //Any children with back edge connections?
            const minimumArrivalTimeOfChildren = dfs(destination,
                                                     current,
                                                     currentTime+1,
                                                     arrivalTimes,
                                                     connections,
                                                     criticals);
             minimumArrivalTime = Math.min(minimumArrivalTime, minimumArrivalTimeOfChildren);
        }        
    }
    if(minimumArrivalTime === currentTime && parent !== -1){
        //The only way is the way we came, so it is a critical path
        criticals.push([current, parent])
    }
    arrivalTimes[current] = minimumArrivalTime;
    return minimumArrivalTime;
}