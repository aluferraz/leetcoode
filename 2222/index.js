/**
 * @param {string} s
 * @return {number}
 */
var numberOfWays = function (s) {
    if (s.length === 0) return 0;
    let [
        zerosCount,
        onesCount
    ] = getCounts(s);
    let total = 0;
    let zerosToTheLeft = 0;
    let onesToTheLeft = 0;
    for (let i = 0; i < s.length; i++) {
        //The catch is to use the 1 to count 010
        let singleContribution = 0;
        if (s[i] === "1") {
            singleContribution = zerosToTheLeft * (zerosCount - zerosToTheLeft);
            onesToTheLeft++;

        } else if (s[i] === "0") {
            //The catch is to use the 0 to count 101
            singleContribution = onesToTheLeft * (onesCount - onesToTheLeft);
            zerosToTheLeft++;
        }
        total += singleContribution;
    }
    return total;
}
function getCounts(s) {
    let zerosCount = 0;
    let onesCount = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === "0") zerosCount++;
        else onesCount++;
    }
    return [
        zerosCount,
        onesCount
    ];
}

//console.log(numberOfWays("0001100100"))
