/**
 * @param {string} s
 * @return {number}
 */


var calculate = function (s) {
    let cursor = {
        idx: 0
    }
    let exp = [0, '+'];
    return calculateHelper(s, cursor, exp);
}
function calculateHelper(s, cursor, exp) {
    if (cursor.idx >= s.length) {
        return calculateExp(...exp);
    }
    let current = s[cursor.idx];
    let topOfStack = exp[exp.length - 1]
    switch (current) {
        case ' ':
            break;
        case '(':
            cursor.idx++;
            let innerExp = [0, '+']
            current = calculateHelper(s, cursor, innerExp);
            exp.push(current)
            break;
        case ')':
            return calculateExp(...exp);
        default:
            if (isNumber(current) && isNumber(topOfStack)) {
                let fullNumber = [exp.pop()];
                fullNumber.push(current);
                exp.push(fullNumber.join(''));
            } else if (isOperator(current) && isOperator(topOfStack)) {
                let prev = exp.pop();
                let newOp = '+';
                if (
                    prev === '+' && current === '-' ||
                    prev === '-' && current === '+'
                ) {
                    newOp = '-';
                }
                exp.push(newOp);
            } else {
                if (exp.length === 3) {
                    let result = calculateExp(...exp);
                    exp = [result];
                }
                exp.push(current)
            }
    }
    cursor.idx++;
    return calculateHelper(s, cursor, exp);
}
function calculateExp(a, op, b) {
    switch (op) {
        case '+':
            return parseInt(a) + parseInt(b);
        case '-':
            return parseInt(a) - parseInt(b);
    }

}
function isNumber(s) {
    return !isNaN(s);
}
function isOperator(s) {
    return s === '+' || s === '-';
}



console.log(calculate("2147483647"))


