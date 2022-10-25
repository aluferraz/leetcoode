/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */
const mod = BigInt(Math.pow(10, 9) + 7)
var numRollsToTarget = function (n, k, target) {
    if (n < 1) return 0;
    if (k < 1) return 0;
    let cache = Array(n + 1).fill().map((_) => { return Array(target + 1).fill(-1n) });
    let result = calculateRemaining(n, k, target, 0, 0, cache);
    return result;
};

function calculateRemaining(n, k, target, sum, idx, cache) {

    if (cache[idx][sum] !== -1n) {
        return cache[idx][sum];
    }
    if (idx === n) {
        return (sum === target ? 1n : 0n);
    }
    let total = 0n;
    for (let i = 1; i <= Math.min(k, (target - sum)); i++) {
        total = (total + calculateRemaining(n, k, target, sum + i, idx + 1, cache)) % mod;
    }
    cache[idx][sum] = total;
    return total;
}

console.log(numRollsToTarget(30, 30, 500))