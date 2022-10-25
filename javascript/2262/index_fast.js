/**
 * @param {string} s
 * @return {number}
 */
var appealSum = function (s) {
    let result = 0;
    const n = s.length;

    let seen = new Map();

    for (let i = 0; i < s.length; i++) {
        const letter = s[i];
        let previousRepeated = -1;
        if (seen.has(letter)) {
            previousRepeated = seen.get(letter);
        }
        seen.set(letter, i);

        const numberOfStringsStartingFromHere = (n - i);
        const numberOfStringsStartedWithoutPrevious = (n - i) * (i - ( previousRepeated + 1) );
        const totalContribution = numberOfStringsStartingFromHere + numberOfStringsStartedWithoutPrevious;
        result += totalContribution;
    }

    return result;
};
//appealSum("abbaba")