var secondsToRemoveOccurrences = function (s) {
    let firstOccurrenceOfOne = -1;
    for (let i = (s.length - 1); i >= 0; i--) {
        if (s[i] === '1') {
            firstOccurrenceOfOne = i;
            break;
        }
    }
    if (firstOccurrenceOfOne === -1) return 0;
    let countZero = 0;
    let waitTime = 0;
    for (let i = 0; i <= firstOccurrenceOfOne; i++) {

        //We check if count(0) > 0 because a string with leading ones doesnt need to swap;
        if (i > 0 && s[i] === '1' && s[i - 1] === '1' && countZero > 0) {
            waitTime++;
        }
        if (i > 0 && s[i] === '0' && s[i - 1] === '0') {
            waitTime = Math.max((waitTime - 1), 0);
        }
        if (s[i] === '0') countZero++;
    }
    return countZero + waitTime;
}
/**
 * @param {string} s
 * @return {number}

//Seems like BFS
var secondsToRemoveOccurrences = function (s) {
    let stack = [];
    //First pass to get all 01 ocurr
    // debugger;
    const sAsArray = s.split('');
    for (let i = 1; i < s.length; i++) {
        if (canSwap((i - 1), i, sAsArray)) stack.push([(i - 1), i]);
    }
    let passes = 0;
    while (stack.length > 0) {
        let size = stack.length;
        let swapMade = false;
        let newPossibilites = {}; // Avoids duplicates
        for (let i = 0; i < size; i++) {
            const currentTuple = stack.pop();
            if (canSwap(currentTuple[0], currentTuple[1], sAsArray)) {
                swapMade = true;
                swap(currentTuple[0], currentTuple[1], sAsArray);
                //We create room for two new possibilities
                let newPossibleSlotFirst = currentTuple[0] - 1;
                let newPossibleSlotLast = currentTuple[1] + 1;
                if (validIndex(newPossibleSlotFirst, currentTuple[0], sAsArray)) {
                    let newInterval = [newPossibleSlotFirst, currentTuple[0]];
                    let newIntervalKey = newInterval[0].toString() + newInterval[1].toString();
                    newPossibilites[newIntervalKey] = newInterval;
                }
                if (validIndex(currentTuple[1], newPossibleSlotLast, sAsArray)) {
                    let newInterval = [currentTuple[1], newPossibleSlotLast];
                    let newIntervalKey = newInterval[0].toString() + newInterval[1].toString();
                    newPossibilites[newIntervalKey] = newInterval;
                }
            }
        }
        if (swapMade) passes++;

        for (let key in newPossibilites) {
            const newTuple = newPossibilites[key];
            if (canSwap(newTuple[0], newTuple[1], sAsArray)) {
                stack.push(newTuple);
            }
        }
    }
    return passes;
};

function canSwap(i, j, array) {
    return array[i] === '0' && array[j] === '1' && validIndex(i, j, array);
}
function validIndex(i, j, array) {
    return j === (i + 1) && i >= 0 && i < array.length && j >= 0 && j < array.length;
}
function swap(i, j, array) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

secondsToRemoveOccurrences("0110101");

 */