/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
    let hashTable = {};
    for(let i = 0; i< nums.length ; i++){
        const currentNum = nums[i];
        const diff = target - currentNum;
        if(diff in hashTable){
            return[ hashTable[diff],i ];
        }
        hashTable[currentNum] = i;
    }
    return [];
};