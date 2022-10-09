/**
 * @param {string} s
 * @return {number}
 */
var minSwaps = function (s) {

    let total = [0, 0];
    s = s.split('')
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '0') total[0]++;
        else total[1]++;
        s[i] = parseInt(s[i]);
    }


    let result = Infinity;
    let totalBkp = total.slice();
    for (let j = 0; j < 2; j++) {
        total = totalBkp.slice();
        let minSwaps = 0;
        let currentDigit = j;
        let alternateDigit = ((j + 1) % 2);
        let filler = Array(s.length).fill(null);

        filler[0] = currentDigit;
        for (let i = 0; i < s.length; i = i + 2) {
            filler[i] = currentDigit;
            total[currentDigit]--;
            if (total[currentDigit] < 0) {
                minSwaps = Infinity; //Not enough
                break
            }
        }
        if (total[currentDigit] > 0) {
            minSwaps = Infinity; break; //Unbalenced
        }

        currentDigit = alternateDigit;
        for (let i = 1; i < s.length; i = i + 2) {
            filler[i] = currentDigit;
            total[currentDigit]--;
            if (total[currentDigit] < 0) {
                minSwaps = Infinity; //Not enough
                break;
            }
            if (filler[i] !== s[i]) {
                //This pos was swapped
                minSwaps++;
            }
        }
        if (total[currentDigit] > 0) minSwaps = Infinity; //Unbalenced
        result = Math.min(result, minSwaps)
    }
    return result === Infinity ? -1 : result;
};





console.log(minSwaps("111000"));