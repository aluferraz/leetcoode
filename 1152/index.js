/**
 * @param {string[]} username
 * @param {number[]} timestamp
 * @param {string[]} website
 * @return {string[]}
 */
//Order is important
//score is the number of users that visited the same websites in the same order
//Return the pattern with the largest score. If there is more than one pattern with the same largest score, return the lexicographically smallest such pattern.
//pattern are always couples of three

//Can we have more than three access for one user?
//If we have that case, should I consider all possibilities on that user? [1,2,3,4]=>,[1,2,3],[1,3,4], [2,3,4] ?
//KADENES ALGORITHM
const PATTERN_SIZE = 3;
var mostVisitedPattern = function(username, timestamp, website) {
    
    //O(Nlogn) Time O(N) Space
    let timestampSort = buildTimestampSort(username, timestamp, website);
    //O(N) Time O(N) space
    let patternsByUser = buildPatternByUser(timestampSort);
    let mostVisited = [];
    let visitedMap = {};
    let mostVisitedCount = -Infinity;
        
        
    for(let currentUser in patternsByUser){
        const patternsOfUser = patternsByUser[currentUser];
        if(patternsOfUser.length < 3) continue;

        let patterns = getAllCombinations(patternsOfUser);
        for(let combination in patterns){
            const patternKey = patterns[combination].join('-');
            if(! (patternKey in visitedMap)){
                visitedMap[patternKey] = 0;
            }
            visitedMap[patternKey]++;
            if(visitedMap[patternKey] >= mostVisitedCount){
                if(visitedMap[patternKey] === mostVisitedCount ){
                    //If there is more than one pattern with the same largest score, return the lexicographically smallest such pattern.
                    const currentMostVisitedKey = mostVisited.join('-');
                    if(patternKey != currentMostVisitedKey && currentMostVisitedKey < patternKey){
                        continue;
                    }
                }
            mostVisitedCount = visitedMap[patternKey]; //Number of visits on that pattern
            mostVisited = patterns[combination];
            }     
        }        
    }
    return mostVisited;
};
    
function getAllCombinations(patterns){
   let result = [];
   let combinations = new Set();
   for(let i = 0; i < patterns.length ; i++){
       for(let j = i+1; j < patterns.length ; j++){
           for(let k = j+1; k < patterns.length ; k++){
               const patternKey = patterns[i].toString() +
                                  patterns[j].toString() +
                                  patterns[k].toString();
               if(combinations.has( patternKey )) continue;
               combinations.add(patternKey);
               result.push([
                   patterns[i],
                   patterns[j],
                   patterns[k]
               ])
           }           
       }
   }
  return result;
    
}    
function swap(i,j,array){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function buildTimestampSort(username, timestamp, website){
    let timestampSort = [];
    for(let i = 0; i < timestamp.length; i++){
        timestampSort.push( [timestamp[i],  username[i], website[i]]  );
    }
    timestampSort.sort((a,b) =>{ return a[0] - b[0] });
    return timestampSort;
}

function buildPatternByUser(timestampSort){
    let patternsByUser = {};
    for(let i = 0; i < timestampSort.length; i++){
        const currentWebsite = timestampSort[i][2];
        const currentUser = timestampSort[i][1];
        if(!( currentUser in patternsByUser )){            
           patternsByUser[currentUser] = []; //Strings are immutable in  js
        }
        patternsByUser[currentUser].push( currentWebsite );
        
    }
    return patternsByUser;
    
}
