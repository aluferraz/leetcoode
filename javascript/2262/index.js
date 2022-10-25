/**
 * @param {string} s
 * @return {number}
 */
var appealSum = function (s) {
    //First lets find out the range where every letter is unique,
    //using a hashmap to do it in O(N)
    let previousRepeated = getRepeated(s); //We can do this in a single pass, but is less readable
    //Now for every letter, lets calculate it's unique contribution as unique.
    let result = 0;
    const n = s.length;
    for (let i = 0; i < s.length; i++) {
        //We know that the first letter can't be seen before, so the first letter has it's contribution 
        //of (n-i).
        //E.g: "abbaba" -> starting from the "a", this letter is unique at least 6 times (n-i);
        //     " bbaba" -> starting from the "b", this letter is unique at least 5 times (n-i);
        //     "  baba" -> starting from the second "b", this letter is unique at least 4 times (n-i);
        //     "   aba" -> starting from the second "a", this letter is unique at least 3 times (n-i);
        //     "    ba" -> starting from the third "b", this letter is unique at least 2 times (n-i);
        //     "     a" -> starting from the third "a", this letter is unique at least 1 time (n-i);
        const numberOfStringsStartingFromHere = (n - i);
        //Now we need to know, how many string started before the current letter that DIDN'T have that letter
        //that's why we neeed the previous array to know the previous idx of the current letter:
        // "abbaba" => prev = [-1, -1, 1, 0, 2 ,3]
        //E.g: "abbaba" -> starting from the "a", this letter is unique at least 6 times (n-i), but for strings betwen (previous + 1) and current idx (i - (prev + 1)) =>  6 * (0 - (-1+1) ) = 0;
        //     " bbaba" -> starting from the "b", this letter is unique at least 5 times (n-i) but for strings betwen (previous + 1) and current idx (i - (prev + 1)) =>  5 * (1 - (-1+1) ) = 1;
        //     "  baba" -> starting from the second "b", this letter is unique at least 4 times (n-i) but for strings betwen (previous + 1) and current idx (i - (prev + 1)) =>  4* (2 - (1+1) ) = 0;
        //     "   aba" -> starting from the second "a", this letter is unique at least 3 times (n-i) but for strings betwen (previous + 1) and current idx (i - (prev + 1)) =>  3 * (3 - (0+1) ) = 6;
        //     "    ba" -> starting from the third "b", this letter is unique at least 2 times (n-i) but for strings betwen (previous + 1) and current idx (i - (prev + 1)) =>  2 * (4 - (2+1) ) = 4;
        //     "     a" -> starting from the third "a", this letter is unique at least 1 time (n-i) but for strings betwen (previous + 1) and current idx (i - (prev + 1)) =>  1 * (5 - (3+1) ) = 1;

        //This allow us to count "bb" as 1 contribution for the first b, "bbab" as 1 contribution for the first be
        // and "bab" as 1 contribution
        const numberOfStringsStartedWithoutPrevious = (n - i) * (i - ( previousRepeated[i] + 1) );

        const totalContribution = numberOfStringsStartingFromHere + numberOfStringsStartedWithoutPrevious;
        result += totalContribution;
    }

    return result;
};
function getRepeated(s) {
    let previousRepeated = Array(s.length).fill(-1);
    let seen = new Map();
    for (let i = 0; i < s.length; i++) {
        const letter = s[i];
        if (seen.has(letter)) {
            const previousIdx = seen.get(letter);
            previousRepeated[i] = previousIdx;
        }
        seen.set(letter, i);
    }
    return previousRepeated;
}

//appealSum("abbaba")