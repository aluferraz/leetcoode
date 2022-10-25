/**
 * @param {number[]} cells
 * @param {number} n
 * @return {number[]}
 */
 var prisonAfterNDays = function(cells, n) {
    if(n === 0) return cells;
    let cache = new Map();
    let hasCache = false;
    let cacheKey = '';
    for(let i = 0; i < n ; i++){
        cacheKey = cells.join('-');
        if(cache.has(cacheKey)){
            debugger;
            n = n % ( i -  cache.get(cacheKey));
            if(n === 0) n = ( i -  cache.get(cacheKey));
            hasCache = true;
            break;
        }
        changeCells(cells);
        cache.set(cacheKey, i);
    }
    if(hasCache){
       debugger;
      //  cells = cache[cacheKey];
        // compute the remaining
        for(let i = cache.get(cacheKey); i < n ; i++){
            changeCells(cells);
        }
    }
    return cells;
    
};

function changeCells(cells) {
    let previousState = cells.slice();
    for (let i = 1; i < cells.length - 1; i++) {
        if (previousState[i - 1] === previousState[i + 1]) cells[i] = 1;
        else cells[i] = 0;
    }
    cells[0] = 0;
    cells[cells.length - 1] = 0;
}
prisonAfterNDays([1,1,0,1,1,0,0,1],300663720)
//prisonAfterNDays([1, 0, 0, 1, 0, 0, 1, 0], 1000000000)
//prisonAfterNDays([0, 0, 1, 1, 1, 1, 0, 0], 8);
//prisonAfterNDays([0, 0, 1, 1, 1, 1, 0, 0], 6);
/// debug aux
// prisonAfterNDays([1, 0, 0, 1, 0, 0, 1, 0], 1000000000);
// prisonAfterNDays([0, 1, 0, 1, 1, 0, 0, 1], 7);
// prisonAfterNDays([0, 0, 1, 1, 1, 1, 0, 0], 8);
// prisonAfterNDays([1, 1, 0, 1, 1, 0, 1, 1], 6);


[0,1,0,1,1,0,0,1]
7
[1,0,0,1,0,0,1,0]
1000000000
[0,0,1,1,1,1,0,0]
8
[0,0,1,1,1,1,0,0]
6
[1,1,0,1,1,0,0,1]
300663720