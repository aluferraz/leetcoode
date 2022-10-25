
var RandomizedSet = function () {
    this.indexes = new Map();
    this.values = [];
    this.lastIndex = 0;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
    if (this.indexes.has(val)) return false;
    this.values.push(val);
    this.indexes.set(val, this.values.length - 1);
    return true;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
    if (!this.indexes.has(val)) return false;
    let index = this.indexes.get(val);
    let lastIndex = this.values.length - 1;
    if (index !== lastIndex) {
        this.swap(index, lastIndex);
    }
    this.values.pop();
    this.indexes.delete(val)
    return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
    if (this.values.length === 0) throw new Error("No values");
    let idx = _.random(0, (this.values.length - 1));
    return this.values[idx];
};
RandomizedSet.prototype.swap = function (i, j) {
    let temp = this.values[i];
    this.values[i] = this.values[j];
    this.values[j] = temp;
    this.indexes.set(this.values[j], j);
    this.indexes.set(this.values[i], i);
}

let randomizedSet = new RandomizedSet();
console.log((randomizedSet.insert(0)));
console.log((randomizedSet.insert(1)));
console.log((randomizedSet.remove(0)));
console.log((randomizedSet.insert(2)));
console.log((randomizedSet.remove(1)));
console.log((randomizedSet.getRandom()));