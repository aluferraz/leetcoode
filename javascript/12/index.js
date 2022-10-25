const map = {
    1: "I",
    4: "IV",
    5: "V",
    9: "IX",
    40: "XL",
    10: "X",
    50: "L",
    90: "XC",
    100: "C",
    500: "D",
    400: "CD",
    900: "CM",
    1000: "M",
};


/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
    let s = num.toString();
    let numArray = _.padStart(s, 4, '0').split('').map((el) => { return parseInt(el) });

    let result = [];
    for (let i = 0; i < numArray.length; i++) {
        let number = numArray[i];
        if (number === 0) continue;
        switch (i) {
            case 0:
                for (let k = 0; k < number; k++) {
                    result.push("M")
                }
                break;
            case 1:
                mapGeneric(number, map["100"], map["400"], map["500"], map["900"], result)
                break;
            case 2:
                mapGeneric(number, map["10"], map["40"], map["50"], map["90"], result)
                break;
            case 3:
                mapGeneric(number, map["1"], map["4"], map["5"], map["9"], result)
                break;

        }
    }
    return result.join('');

};


function mapGeneric(number, one, four, five, nine, result) {
    if (number < 4) {
        for (let k = 0; k < number; k++) {
            result.push(one)
        }
    }
    if (number === 4) { // 400..
        result.push(four)
    }
    if (number >= 5 && number <= 8) {
        result.push(five)
        let remaining = number - 5;
        for (let k = 0; k < remaining; k++) {
            result.push(one)
        }
    }
    if (number === 9) {
        result.push(nine)
    }
}


console.log(intToRoman("58"))