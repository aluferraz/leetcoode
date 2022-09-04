/**
 * @param {number[]} strength
 * @return {number}
 */

//NOT FINISHED :(


const mod_result = (Math.pow(10, 9) + 7);
var totalStrength = function (strength) {
    const length = strength.length;
    const right = Array(length).fill(length);
    const left = Array(length).fill(-1);
    const presum = [];
    let stack = [];
    /**
     * Monostack right and presum
     */
    for (let i = 0; i < strength.length; i++) {
        let topOfStack = -Infinity;
        if (stack.length > 0) {
            topOfStack = stack[stack.length - 1];
        }
        const currentElement = strength[i];
        while (stack.length > 0 && strength[topOfStack] > currentElement) {
            const smallestIndexToTheRight = stack.pop();
            right[smallestIndexToTheRight] = i;
            topOfStack = stack[stack.length - 1];
        }
        stack.push(i);

        let presumLast = 0;
        if (presum.length > 0) {
            presumLast = presum[presum.length - 1];
        }
        presum.push((presumLast + currentElement) % mod_result);
    }
    stack = [];
    /**
     * Monostack left
     */
    for (let i = (length - 1); i >= 0; i--) {
        let topOfStack = -Infinity;
        if (stack.length > 0) {
            topOfStack = stack[stack.length - 1];
        }
        const currentElement = strength[i];
        while (stack.length > 0 && strength[topOfStack] >= currentElement) {
            const smallestIndexToTheLeft = stack.pop();
            left[smallestIndexToTheLeft] = i;
            topOfStack = stack[stack.length - 1];
        }
        stack.push(i);
    }
    /**
     *
     *  The strength of the weakest wizard in the group.
     *   The total of all the individual strengths of the wizards in the group.
     */
    let result = 0;
    for (let i = 0; i < strength.length; i++) {
        let leftIdx = Math.max(left[i], 0);
        let rightIdx = right[i];

        let leftAcc = presum[i] - presum[leftIdx];
        let rightAcc = presum[rightIdx] - presum[i];

        let ln = i - leftIdx; // Number of subarrays with strength[i] as minimum
        let rn = rightIdx - i; // Number of subarrays with strength[i] as minimum


        const individualContribution = (
            (
                (strength[i] * ln * leftAcc) -
                (strength[i] * rn * rightAcc)
            ) % mod_result);
        result += individualContribution;
    }

    debugger;
    return result;

}

