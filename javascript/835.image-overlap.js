/*
 * @lc app=leetcode id=835 lang=javascript
 *
 * [835] Image Overlap
 */

// @lc code=start
/**
 * @param {number[][]} img1
 * @param {number[][]} img2
 * @return {number}
 */
//https://leetcode.com/problems/image-overlap/discuss/290586/Javascript-beat-100
 var largestOverlap = function(A, B) { 
    // Get hashset of B
    // key 100* r + c
    let len = B.length;
    let setB = new Set();
    for(let i = 0; i < len; i++) {
        for(let j = 0 ; j < len ; j++){
            if(B[i][j] === 1) {
                setB.add(i * 100 + j);
            }
        }
    }
    let map = {};
    for(let i = 0; i < len; i++) {
        for(let j = 0 ; j < len ; j++){
            if(A[i][j] === 1) {
                setB.forEach(b => { 
                    let o = i * 100 + j;
                    map[b - o] = ~~map[b - o] + 1;
                })
            }
        }
    }
    let res = 0;
    Object.keys(map).forEach(key => {
        res = Math.max(res, map[key]);
    })
    return res;
};
// @lc code=end

