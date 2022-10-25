/**
 * @param {number[]} nums
 * @return {number}
 */
var getMaxLen = function (nums) {
    let [negAhead, negCount, negBefore, zeroAhead] = mapNegatives(nums);
    let maxRange = 0;
    let flip = 1;
    let begin = 0;
    let end = 0;
    for (let i = 0; i < nums.length; i++) {
        let number = nums[i] * flip;

        if (number > 0) {
            //Easy case
            end++;
            maxRange = Math.max(maxRange, (end - begin));

        } else if (number === 0) {
            maxRange = Math.max(maxRange, (end - begin));
            begin = i + 1; //Can't begin here - No problem if exceeds the array, because if so, will not be used on the caculation
            end = begin;
            flip = 1;
            continue;
        } else if (number < 0) {
            let hasEnoughToFlip = negAhead[i] !== -1;
            //I cant use this number, it is the last negative
            if (!hasEnoughToFlip) {
                number = nums[i]; //Unflip or mainting
                maxRange = Math.max(maxRange, (end - begin)); //Calculate current range
                begin = i + 1; //Start from the next
                end = begin;
                flip = 1;
                continue;
            } else {
                //If I have enough to flip the next but not to flip the last
                //I need to decide if it is better to use this number or skip it
                if (negCount[i] % 2 === 0) {
                    let lastNegativeIdx = negBefore[zeroAhead[i] - 1];
                    if (nums[zeroAhead[i] - 1] < 0) lastNegativeIdx = zeroAhead[i] - 1;
                    let pivotNegativeIdx = Math.min(negBefore[lastNegativeIdx], zeroAhead[i] - 1); // This is the last negative I may flip using this
                    let totalBetween = negCount[i] - negCount[pivotNegativeIdx];
                    if (totalBetween % 2 === 1) {
                        //I can flip my pivot to positive
                        pivotNegativeIdx = lastNegativeIdx - 1;
                    }


                    let maxRangeUsingThis = pivotNegativeIdx - begin;
                    let nextFinish = zeroAhead[i];
                    let maxRangeSkipping = nextFinish - (i + 1)// This is the last position I can get if i skip this number

                    if (maxRangeUsingThis >= maxRangeSkipping) {
                        end++;
                        maxRange = Math.max(maxRange, (end - begin));
                    } else {
                        maxRange = Math.max(maxRange, (end - begin)); //Set current range
                        begin = i + 1; //Start a new one
                        end = begin;
                        flip = 1;
                        continue;
                    }

                } else { //We can flip all the negatives ahead
                    end++;
                    maxRange = Math.max(maxRange, (end - begin));
                }

            }

        }
        flip = number < 0 ? -1 : 1;

    }
    return maxRange;
};

function mapNegatives(nums) {
    let negAhead = Array(nums.length).fill(-1);
    let negBefore = Array(nums.length).fill(nums.length);
    let negCount = Array(nums.length).fill(0);
    let zeroAhead = Array(nums.length).fill(nums.length);

    let lastNegativeSeen = -1;
    let lastZeroSeen = nums.length;
    let count = 0;

    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] === 0) {
            lastNegativeSeen = -1; // Breaks the counter
            lastZeroSeen = i;
            count = 0;
        }
        negAhead[i] = lastNegativeSeen;
        zeroAhead[i] = lastZeroSeen;
        negCount[i] = count;
        if (nums[i] < 0) {
            lastNegativeSeen = i;
            count++;
        }
    }
    lastNegativeSeen = nums.length;

    for (let i = 0; i < nums.length; i++) {
        negBefore[i] = lastNegativeSeen;
        if (nums[i] < 0) {
            lastNegativeSeen = i;
        }
    }

    return [negAhead, negCount, negBefore, zeroAhead];
}

console.log(getMaxLen([0, -16, 33, -23, -5, -5, 2, -16, -7, 3, -35, 13, 0, -1, -1, 0, 34, -2, -25]));