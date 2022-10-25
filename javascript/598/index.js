/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} ops
 * @return {number}
 */
var maxCount = function (m, n, ops) {
    if (ops.length === 0) return m * n;
    const intersectionOfM = Infinity;
    const intersectionOfN = Infinity;
    for(let i = 0; i< ops.length; i++){
        intersectionOfM = Math.min(m, intersectionOfM);
        intersectionOfN = Math.min(n, intersectionOfN);
    }
    return intersectionOfM * intersectionOfN;
};