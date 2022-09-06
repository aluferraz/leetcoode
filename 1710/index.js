/**
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
var maximumUnits = function (boxTypes, truckSize) {
    // debugger;
    boxTypes.sort((a, b) => { return b[1] - a[1] });
    let left = 0;
    let units = 0;
    while (truckSize > 0 && left < boxTypes.length) {
        const currentBox = boxTypes[left];
        const usedBoxes = Math.min(truckSize, currentBox[0]);
        const currentUnits = currentBox[1];
        truckSize -= usedBoxes;
        units += (currentUnits * usedBoxes);
        left++;
    }
    return units;
}
