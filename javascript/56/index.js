
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
//Sort by starting time
// NlogN + N
//n (logN + 1) => O(NlogN)
// o(k)
var merge = function(intervals) {
    if(intervals.length <= 1) return intervals;
    intervals.sort((a,b) => {return a[0] - b[0]}); // Sorting the input array inplace to avoid extra space
    const result = [];
    let left = 0;
    let right = 1;
    while(left < intervals.length){
        const current = intervals[left];
        let intervalToPush = current;
        right = left + 1;
        if(right < intervals.length ){
            let possibleOverlaps = intervals[right];
            while(
                    ( intervalToPush[0] === possibleOverlaps[0] || 
                      intervalToPush[1] >= possibleOverlaps[0]  )
                 ){
                  intervalToPush = [ intervalToPush[0], Math.max(intervalToPush[1], possibleOverlaps[1]) ];
                  left = right;
                  right++;
                  if(right >= intervals.length) break;
                  possibleOverlaps = intervals[right];
            }
        }
        left++;
        result.push(intervalToPush)
    }
    
    
    return result;
    
};