/**
 * @param {character[][]} grid
 * @return {number}
 */

//Find all groups of 1 connected,
//mark visited nodes to avoid recounting the same island
// Double for's + BFS 
var numIslands = function(grid) {
    return findOnes(grid);
    

    
};

function findOnes(grid){
    const coords = [];
    const visited = new Set();
    let islands = 0;
    for(let y = 0; y < grid.length ; y++){
        for(let x = 0; x < grid[y].length; x++){
            const cacheKey = `${y.toString()}-${x.toString()}`;    
            if(grid[y][x] === '1' && !visited.has( cacheKey ) ) {               
               bfsFindIslands(grid,[ [y,x] ], visited ) ; // Mark island as visited
               islands++;
            };
        }
    }
    return islands;
}

function bfsFindIslands(grid,onesInGraph, visited){
    const stack = onesInGraph;
    const initialPos = onesInGraph[0] // [Y , X] coords
    
    while(stack.length){
        const size = stack.length;
        for(let i = 0; i< size; i++){
            const coord = stack.pop();
            const curY = coord[0];
            const curX = coord[1];
            const cacheKey = `${curY.toString()}-${curX.toString()}`;
            if(visited.has(cacheKey)) continue;
            visited.add( cacheKey );
            //Test all directions
            const { UP, DOWN, LEFT, RIGHT } = getDirections(curY,curX, grid);
            if( validPos( UP[0], UP[1] , grid) && grid[UP[0]][UP[1]] === '1' && !visited.has(  `${UP[0].toString()}-${UP[1].toString()}` ) ){
                stack.push([UP[0], UP[1] ]);
            }
            if( validPos( DOWN[0], DOWN[1] , grid ) && grid[DOWN[0]][DOWN[1]] === '1' && !visited.has(  `${DOWN[0].toString()}-${DOWN[1].toString()}` ) ){
                stack.push([DOWN[0], DOWN[1] ]);
            }
            if( validPos( LEFT[0], LEFT[1] , grid ) && grid[LEFT[0]][LEFT[1]] === '1' && !visited.has(  `${LEFT[0].toString()}-${LEFT[1].toString()}` ) ){
                stack.push([LEFT[0], LEFT[1] ]);
            }
            
            if( validPos( RIGHT[0], RIGHT[1] , grid ) && grid[RIGHT[0]][RIGHT[1]] === '1' && !visited.has(  `${RIGHT[0].toString()}-${RIGHT[1].toString()}` )  ){
                stack.push([RIGHT[0], RIGHT[1] ]);
            }
                       
            
        }
    }
}

function validPos(y,x,grid){
    return (y >= 0 && y < grid.length) && (x >= 0 && x < grid[y].length);
}

function getDirections(y,x,grid){
    return {
        UP: [(y-1), x],
        DOWN: [(y+1), x],
        LEFT: [y, (x-1)],
        RIGHT: [y, (x + 1)]
    }
    
}