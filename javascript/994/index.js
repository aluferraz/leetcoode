/**
 * @param {number[][]} grid
 * @return {number}
 */
 var orangesRotting = function(grid) {
    let stackOfRotten = [];
    let totalFreshOranges = countOrangesAndPopulateStack(grid, stackOfRotten);
    if(totalFreshOranges === 0 ) return 0;
    if(stackOfRotten.length === 0) return -1;
    //bfs
    let minutes = 0;
    let totalConverted = 0;
    while(stackOfRotten.length > 0){
        minutes++;
        let size = stackOfRotten.length;
        let minuteConverted = 0;
        for(let i = 0; i< size; i++){
            const currentPos = stackOfRotten.shift(); //O(n) -> linked list would be better 
            const converttedOranges = convertNeighboors(currentPos,grid);
            minuteConverted += converttedOranges.length;
            stackOfRotten = stackOfRotten.concat(converttedOranges);
        }
        if(minuteConverted === 0 && stackOfRotten.length > 0 ){ // no adjacent rotten
            break;
        }
        totalConverted += minuteConverted;
    }
    return totalConverted === totalFreshOranges ? (minutes-1) : -1;
};

function convertNeighboors(coords, grid){
    const y = coords[0];
    const x = coords[1];
    const convertted = [];
    const validNeighboors = getValidNeighboors(y,x,grid);
    for(let i = 0; i< validNeighboors.length; i++){
        const neighboor = validNeighboors[i];
        const neighboorY = neighboor[0];
        const neighboorX = neighboor[1];
        if(grid[neighboorY][neighboorX] === 1){
            grid[neighboorY][neighboorX] = 2; //Passed by ref.
            convertted.push([neighboorY,neighboorX]);
        }
    }    
    return convertted;
}

function getValidNeighboors(y,x,grid){
    let newY = y;
    let newX = x;
    let result = [];
    //up
    newY--;
    if(newY >= 0){
        result.push([newY,newX]);
    }
    //Down
    newY = y;
    newY++;
    if(newY < grid.length){
        result.push([newY,newX]);
    }
    //Left
    newY = y;
    newX--;
    if(newX >= 0){
        result.push([newY,newX]);
    }
    //Right
    newX = x;
    newX++;
    if(newX < grid[newY].length){
        result.push([newY,newX]);
    }
    return result;
}
function countOrangesAndPopulateStack(grid, stackOfRotten){
    let total = 0;
    for(let i = 0; i< grid.length;i++){
        for(let j = 0;j<grid[i].length;j++){
            const currentCell = grid[i][j];
            if(currentCell === 0) continue;
            if(currentCell === 1) total++;
            if(currentCell === 2) stackOfRotten.push([i,j]);
        }
    }
    return total;
}

orangesRotting([[2,1,1],[1,1,0],[0,1,1]]);