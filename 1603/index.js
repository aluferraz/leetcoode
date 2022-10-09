/**
 * @param {number} big
 * @param {number} medium
 * @param {number} small
 */
var ParkingSystem = function (big, medium, small) {
    this.spots = [big, medium, small];
};

/** 
 * @param {number} carType
 * @return {boolean}
 */
ParkingSystem.prototype.addCar = function (carType) {
    this.spots[carType - 1] = this.spots[carType - 1] - 1;
    return this.spots[carType - 1] >= 0;
};

/** 
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new ParkingSystem(big, medium, small)
 * var param_1 = obj.addCar(carType)
 */
let parkingSystem = new ParkingSystem(1, 1, 0);
parkingSystem.addCar(1);
parkingSystem.addCar(2);
parkingSystem.addCar(3);
parkingSystem.addCar(1);