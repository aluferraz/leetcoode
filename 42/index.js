/**
 * @param {number[]} height
 * @return {number}
 */
 var trap = function(height) {
    if(height.length === 0 ) return 0;
    let wallsToTheLeft = Array(height.length).fill(0);
    let wallsToTheRight = Array(height.length).fill(0);
    
    
    wallsToTheLeft[0] = height[0];
    for(let i = 1; i < height.length; i++){
        const currentHeight = height[i];
        wallsToTheLeft[i] = Math.max(wallsToTheLeft[i - 1], currentHeight);
    }
    
    wallsToTheRight[height.length - 1] = height[height.length - 1];
    for(let i = height.length -2; i >= 0; i--){
        const currentHeight = height[i];
        wallsToTheRight[i] = Math.max(wallsToTheRight[i + 1], currentHeight);
    }
    let trappedWater = 0;
    for(let i = 0; i < height.length; i++){
        const currentHeight = height[i];
        const shortherWall = Math.min( wallsToTheRight[i], wallsToTheLeft[i]);
        const currentWater = Math.max( (shortherWall - currentHeight ), 0); // we don't want negatives
        trappedWater += currentWater;
    }
    return trappedWater;
    
};

