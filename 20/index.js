/**
 * @param {string} s
 * @return {boolean}
 */

var isValid = function (s) {
    const map = {
        '{': '}',
        '(': ')',
        '[': ']'
    }
    let stack = [];
    for (let i = 0; i < s.length; i++) {
        let current = s[i];
        let topOfStack = stack.length > 0 ? stack[stack.length - 1] : '';
        if (topOfStack in map) {
            if (map[topOfStack] === current) {
                stack.pop();
            } else {
                stack.push(current);
            }
        } else {
            stack.push(current);
        }
    }
    return stack.length === 0;
};