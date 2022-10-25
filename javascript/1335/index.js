/**
 * @param {number[]} jobDifficulty
 * @param {number} d
 * @return {number}
 */
//Minimum sum of S[d]
//
var minDifficulty = function (jobDifficulty, d) {
    if (d > jobDifficulty.length) return -1;
    if (jobDifficulty.length === 0) return -1;
    const cache = new Map();
    return minDifficultyHelper(jobDifficulty, d, 0, cache);

};

function minDifficultyHelper(jobDifficulty, d, i, cache) {
    //debugger;
    if (d === 0) return Infinity;
    if (i === jobDifficulty.length) return Infinity;
    const cacheKey = i.toString() + '-' + d.toString();
    if (cache.has(cacheKey)) return cache.get(cacheKey);
    let currentDifficulty = Infinity;
    let currentMax = -Infinity;
    for (let j = i; j < jobDifficulty.length; j++) {
        const currentJobDif = jobDifficulty[j];
        currentMax = Math.max(currentJobDif, currentMax)
        if (d > 1) {
            const difficultyOfChildCut = minDifficultyHelper(
                jobDifficulty,
                (d - 1),
                j + 1,
                cache
            );
            if ((currentMax + difficultyOfChildCut) < currentDifficulty) {
                currentDifficulty = (currentMax + difficultyOfChildCut);
            }
        } else {
            currentDifficulty = currentMax;
        }

    }
    cache.set(cacheKey, currentDifficulty)
    return currentDifficulty;
}
minDifficulty([6, 5, 4, 3, 2, 1], 2)