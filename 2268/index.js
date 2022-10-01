/**
 * @param {string} s
 * @return {number}
 */
var minimumKeypresses = function (s) {
    const [lettersQueue, letterMap] = enqueueLetters(s);
    const digits = Array(9).fill(0);
    let digitsPos = 0;
    let result = 0;
    while (lettersQueue.size() !== 0) {
        let letterObj = lettersQueue.dequeue().element;
        letterMap[letterObj.letter].presses = digits[digitsPos] + 1; //We take the number of letters assigned to that key + 1.
        digits[digitsPos]++; // Increment the counter for the digit
        digitsPos = (digitsPos + 1) % digits.length; //Move to the next digit
        const { presses, count } = letterMap[letterObj.letter];
        result += (presses * count);
    }
    return result;



};

function enqueueLetters(s) {
    const lettersQueue = new MaxPriorityQueue({ priority: (letter) => letter.count });
    let letterMap = {};

    for (let i = 0; i < s.length; i++) {
        let currentLetter = s[i];
        if (!(currentLetter in letterMap)) {
            letterMap[currentLetter] = {
                letter: currentLetter,
                count: 0
            }
        }
        letterMap[currentLetter].count++;
    }

    for (let letter in letterMap) {
        lettersQueue.enqueue(letterMap[letter]);
    }
    return [lettersQueue, letterMap];
}


//DEBUG

const { MaxPriorityQueue } = require('../IMPORT_CLASSES/node_modules/@datastructures-js/priority-queue')

console.log(minimumKeypresses("abcdefghijkl"))