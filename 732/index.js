
var MyCalendarThree = function () {
    this.bookings = {}
};

/** 
 * @param {number} start 
 * @param {number} end
 * @return {number}
 */
MyCalendarThree.prototype.book = function (start, end) {
    this.bookings[start] = (this.bookings[start] || 0) + 1;
    this.bookings[end] = (this.bookings[end] || 0) - 1;
    let keys = Object.keys(this.bookings);
    keys.sort((a, b) => { return a - b });
    let max = -Infinity;
    let current = 0;
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        current += this.bookings[key];
        max = Math.max(current, max);
    }
    return max;
};
let myCalendarThree = new MyCalendarThree();
console.log((myCalendarThree.book(24, 40)));
console.log((myCalendarThree.book(43, 50)));
console.log((myCalendarThree.book(27, 43)));
console.log((myCalendarThree.book(5, 21)));
console.log((myCalendarThree.book(30, 40)));
console.log((myCalendarThree.book(14, 29)));
console.log((myCalendarThree.book(3, 19)));
console.log((myCalendarThree.book(3, 14)));
console.log((myCalendarThree.book(25, 39)));
console.log((myCalendarThree.book(6, 19)));
