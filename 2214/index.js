/**
 * @param {number[]} damage
 * @param {number} armor
 * @return {number}
 */
var minimumHealth = function (damage, armor) {
    let maxDamage = -Infinity;
    let totalDamage = 0;
    //debugger;
    for (let i = 0; i < damage.length; i++) {
        const currentDamage = damage[i];
        totalDamage += currentDamage;
        maxDamage = Math.max(currentDamage, maxDamage)
    }
    let maxDefence = 0;
    if (armor > maxDamage) {
        maxDefence = maxDamage;
    } else {
        maxDefence = armor;// Partial defence
    }
    const minStart = totalDamage - maxDefence + 1;
    return Math.max(minStart, 1);
};