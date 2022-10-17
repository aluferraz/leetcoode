/**
 * @param {number} n
 * @return {number}
 */

var findDerangement = function (n) {
    if (n === 0)
        return BigInt(1);
    if (n === 1)
        return BigInt(0);
    let first_behind = BigInt(0);
    let second_behind = BigInt(1);
    let result = second_behind;
    for (let i = 2; i <= n; i++) {
        result = BigInt(i - 1) * (first_behind + second_behind);
        second_behind = first_behind;
        first_behind = result;
    }

    return result % BigInt(1000000007);
};

console.log(findDerangement(5));