/**
 * @param {string} digits
 * @return {string[]}
 */
const map = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],

}

//T: O(N^2) /  S: O(N)
var letterCombinations = function (digits) {
    if (digits.length === 0) return [];
    return letterCombinationsHelper(digits);
};

function letterCombinationsHelper(digits, i = 0, runningResult = [], result = []) {
    if (i === digits.length) {
        result.push(runningResult.join('')); //O(N)
        return result;
    }
    let digit = digits[i];
    let possibilities = map[digit];
    for (let j = 0; j < possibilities.length; j++) {
        let letter = possibilities[j];
        runningResult.push(letter);
        letterCombinationsHelper(digits, i + 1, runningResult, result);
        runningResult.pop();
    }
    return result;
}
