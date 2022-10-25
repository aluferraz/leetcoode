/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
const PLATE = '*';
const CANDLE = '|';
var platesBetweenCandles = function (s, queries) {
   // debugger
    let previousCandles = getPreviousCandles(s); //O(N) - Monotonic stack
    let nextCandles = getNextCandles(s);//O(N)  Monotonic stack
    let presumPlates = getPresumPlates(s) // O(N) -> Could do the tree in one pass, but the code would be very hard to read

    let result = [];
    for (let i = 0; i < queries.length; i++) {
        let query = queries[i];
        let left = query[0];
        let right = query[1];
        if (left < 0 || right >= s.length) { result.push(0); continue; }

        let leftIsPlate = s[left] === PLATE;
        let rightIsPlate = s[right] === PLATE;

        if (leftIsPlate) {
            //We can't use it, we need a candle first, let's take the next one inbounds
            if (nextCandles[left] >= right) { result.push(0); continue; }
            left = nextCandles[left];
        }
        if (rightIsPlate) {
            //We can't use it, we need a candle to consider the sum, let's take the previous one inbounds
            if (previousCandles[right] <= left) { result.push(0); continue; }
            right = previousCandles[right];
        }
        let platesBetween = presumPlates[right] - (left - 1 >= 0 ? presumPlates[left - 1] : 0);
        result.push(platesBetween);

    }
    return result;
};

function getPreviousCandles(s) {
    let previousCandles = Array(s.length).fill(-1); // To make line 29 easier
    let stack = [];
    for (let i = s.length - 1; i >= 0; i--) {
        while (stack.length > 0 && s[i] === CANDLE) {
            previousCandles[stack.pop()] = i;
        }
        stack.push(i);
    }
    return previousCandles;
}

function getNextCandles(s) {
    let nextCandles = Array(s.length).fill(s.length); // To make line 24 easier
    let stack = [];
    for (let i = 0; i < s.length; i++) {
        while (stack.length > 0 && s[i] === CANDLE) {
            nextCandles[stack.pop()] = i;
        }
        stack.push(i);
    }
    return nextCandles;
}

function getPresumPlates(s) {
    let presumPlates = Array(s.length).fill(0); // To make line 24 easier
    presumPlates[0] = s[0] === PLATE ? 1 : 0;
    for (let i = 1; i < s.length; i++) {
        let currentSum = s[i] === PLATE ? 1 : 0;
        presumPlates[i] = presumPlates[i - 1] + currentSum;
    }
    return presumPlates;
}
//platesBetweenCandles("||**||**|*", [[3,8]])