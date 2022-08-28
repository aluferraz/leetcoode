/**
 * @param {number} num
 * @return {string}
 */
const numbersMap = new Map([
    [1000000000, "Billion"],
    [1000000, "Million"],
    [1000, "Thousand"],
    [100, "Hundred"],
    [90, "Ninety"],
    [80, "Eighty"],
    [70, "Seventy"],
    [60, "Sixty"],
    [50, "Fifty"],
    [40, "Forty"],
    [30, "Thirty"],
    [20, "Twenty"],
    [19, "Nineteen"],
    [18, "Eighteen"],
    [17, "Seventeen"],
    [16, "Sixteen"],
    [15, "Fifteen"],
    [14, "Fourteen"],
    [13, "Thirteen"],
    [12, "Twelve"],
    [11, "Eleven"],
    [10, "Ten"],
    [9, "Nine"],
    [8, "Eight"],
    [7, "Seven"],
    [6, "Six"],
    [5, "Five"],
    [4, "Four"],
    [3, "Three"],
    [2, "Two"],
    [1, "One"],
    [0, "Zero"]
]);

var numberToWords = function (num) {
    const wordsArray = convertBasics(num, []);
    return wordsArray.join(" ");
};

function convertBasics(num, resultArray) {
    if (num >= 1000000000) {
        const billionFit = Math.floor(num / 1000000000);
        //resultArray.push(numbersMap.get(billionFit));
        convertBasics(billionFit, resultArray);
        resultArray.push("Billion");
        const remaining = num - (1000000000 * billionFit);
        if (remaining > 0) {
            return convertBasics(remaining, resultArray);
        }
    }

    if (num >= 1000000 && num < 1000000000) {
        const millionFit = Math.floor(num / 1000000);
        //resultArray.push(numbersMap.get(millionFit));
        convertBasics(millionFit, resultArray);
        resultArray.push("Million");
        const remaining = num - (1000000 * millionFit);
        if (remaining > 0) {
            return convertBasics(remaining, resultArray)
        }
    }


    if (num >= 1000 && num < 1000000) {
        const thousandFit = Math.floor(num / 1000);
        //resultArray.push(numbersMap.get(thousandFit));
        convertBasics(thousandFit, resultArray);
        resultArray.push("Thousand");
        const remaining = num - (1000 * thousandFit);
        if (remaining > 0) {
            return convertBasics(remaining, resultArray)
        }
    }

    if (num >= 100 && num < 1000) {
        const hungredsFit = Math.floor(num / 100);
        //resultArray.push(numbersMap.get(hungredsFit));
        convertBasics(hungredsFit, resultArray);
        resultArray.push("Hundred");
        const remaining = num - (100 * hungredsFit);
        if (remaining > 0) {
            return convertBasics(remaining, resultArray);
        }
    }

    //Base cases
    if (num >= 20 && num < 100) {
        const firstNumber = Math.floor(num / 10); // 23 / 10 = 2,3 = 2;
        const firstNumberRound = 10 * firstNumber; // 2* 10 = 20;
        resultArray.push(numbersMap.get(firstNumberRound));
        const remaining = num - firstNumberRound;
        if (remaining > 0) {
            return convertBasics(remaining, resultArray);
        }
    }

    if (num < 20) {
        resultArray.push(numbersMap.get(num));
    }
    return resultArray;

}

