/**
 * @param {number[]} strength
 * @return {number}
 */
const mod = BigInt(Math.pow(10, 9) + 7);
var totalStrength = function (strength) {
    // debugger;
    //First we need to discover in how many arrays
    //a[i] is the min, so we use NLE and PLE
    // the number will be ( i - PLE ) * ( NLE - i ) -> but we will store the idx instead of element
    let PLE = getPreviousLesserElementIdx(strength);
    let NLE = getNextLesserElementIdx(strength);
    // we need to calculate the sum of every subarray
    //to do this, we use a prefixsum of a prefixsum (math proven on my notebook)
    const prefixsum = getPrefixSum(strength);
    const prefixsumOfPrefixSum = getPrefixSum(prefixsum);
    let result = BigInt(0);
    for (let i = 0; i < strength.length; i++) {
        //Contribution of a[i] as the min = a[i] * (( i-PLEIdx) * (NLEIdx i ))
        const leftBound = BigInt((i - PLE[i])); // If we fill with -1, at idx 0 will be  0 - (-1) = 1. 
        const rightBound = BigInt((NLE[i] - i)); // If we fill with size, at the last idx  will be  size - right = 1. 
        const currentEl = BigInt(strength[i]);

        //now we need to calculate the sum of every subarray
        //to do this, we use a prefixsum of a prefixsum (math proven on my notebook)

        let totalSumOfSubArrays = BigInt(0);
        let leftIdx = PLE[i] + 1;
        let rightIdx = NLE[i] + 1;

        const prefixsumOfPrefixSumCurrentToRight = (leftBound * (((prefixsumOfPrefixSum[rightIdx] - prefixsumOfPrefixSum[i + 1]))));
        totalSumOfSubArrays += prefixsumOfPrefixSumCurrentToRight;
        const prefixsumOfPrefixSumLeftToCurrent = (rightBound * (((prefixsumOfPrefixSum[i + 1] - prefixsumOfPrefixSum[leftIdx]))));
        totalSumOfSubArrays -= prefixsumOfPrefixSumLeftToCurrent;

        //Min(a[i,j]) * subArraySum(a[i,j])
        const currentElContribution = (currentEl * totalSumOfSubArrays);
        result = (result + currentElContribution) % mod;
    }
    return result;

};
function getPrefixSum(array) {
    if (array.length === 0) return [];
    let prefixsum = Array(array.length + 1).fill(BigInt(0));
    for (let i = 0; i < array.length; i++) {
        prefixsum[i + 1] = BigInt((BigInt(prefixsum[i]))) + (BigInt(array[i]));
    }
    return prefixsum;
}

function getPreviousLesserElementIdx(array) {
    //Monotonic stack
    let stack = [];
    let PLE = Array(array.length).fill(-1);
    for (let i = (array.length - 1); i >= 0; i--) {
        while (stack.length > 0 && BigInt(array[stack[stack.length - 1]]) > BigInt(array[i])) {
            PLE[stack.pop()] = i;
        }
        stack.push(i);
    }
    return PLE;
}

function getNextLesserElementIdx(array) {
    //Monotonic stack
    let stack = [];
    let NLE = Array(array.length).fill(array.length);
    for (let i = 0; i < array.length; i++) {
        //Here we are going to use <= to avoid duplicates (Edge case-> repeated numbers in the array)

        while (stack.length > 0 && BigInt(array[stack[stack.length - 1]]) >= BigInt(array[i])) {
            NLE[stack.pop()] = i;
        }
        stack.push(i);
    }
    return NLE;
}

