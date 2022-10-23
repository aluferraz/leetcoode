/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
    if (n === 1) return "1";
    let say = countAndSay(n - 1);
    let map = new Map();
    map.set(say[0], 1);
    let result = [];
    for (let i = 1; i < say.length; i++) {
        let digit = say[i];
        if (!map.has(digit)) {
            let prev = say[i - 1];
            let count = map.get(prev);
            result.push([count, prev].join(''));
            map.delete(prev);
            map.set(digit, 1)
        } else {
            map.set(digit, map.get(digit) + 1)
        }
    }
    for (let kv of map) {
        let [digit, count] = kv;
        result.push([count, digit].join(''))
    }

    return result.join('');
};

//"111221"

console.log(countAndSay(5));