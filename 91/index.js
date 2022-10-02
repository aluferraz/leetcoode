/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
    if (s.length === 0) return 0; // Can't be empty
    //  let numberOfWays = Array(s.length + 1).fill(0);
    if (parseInt(s[0]) === 0) return 0; // Can't start with 0
    let sArray = ["0"].concat(s.split(''));

    let two_back = 1;
    let one_back = 1;
    let numberOfWays = 0;
    for (let i = 1; i < sArray.length; i++) {
        let digit = parseInt(sArray[i]);
        let prev = parseInt(sArray[i - 1]);
        let combined = parseInt(prev.toString() + digit.toString());
        if (digit === 0) {
            //0 can't be used to start a number, but can be used to finish
            if (prev === 1 || prev === 2) {
                //Between 10 - 20 ok
                numberOfWays = two_back;
            } else {
                return 0;
            }
        } else {
            if (combined <= 26 && prev !== 0) {
                // it fits in 26
                numberOfWays = one_back + two_back;// numberOfWays[i - 1] + numberOfWays[i - 2]
            }
            else numberOfWays = one_back;//numberOfWays[i - 1];
        }
        two_back = one_back;
        one_back = numberOfWays;
    }
    return numberOfWays;

};

//1  - 1

//1 1  - 2
//11

//1 1 1 - 3
//11 1
//1 11


console.log(numDecodings("12"))