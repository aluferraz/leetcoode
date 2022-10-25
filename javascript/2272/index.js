/**
 * @param {string} s
 * @return {number}
 */
 var largestVariance = function (s) {
	const distinctLetters = new Set(s.split(''));
    let variance = 0;
	for (let letterOne of distinctLetters) {
		for (let letterTwo of distinctLetters) {
			if (letterOne === letterTwo) continue;
            let countOne = 0;
            let countTwo = 0;
            let sawTwoBefore = false;
			for (let i = 0; i < s.length ; i++) {
                const char = s[i];
                switch(char){
                    case letterOne: 
                        countOne++;
                        break;
                    case letterTwo: 
                        countTwo++;
                        break;
                    default:
                        continue;
                }
                if(countOne > countTwo && countTwo > 0){
                    variance = Math.max(variance, countOne - countTwo)
                }else if(countOne > countTwo && sawTwoBefore){
                    // We saw an letterTwo in this loop, but we are using that letter to start the substring.
                    variance = Math.max(variance, countOne - countTwo - 1)
                }else if(countOne < countTwo) {
                    sawTwoBefore = countTwo > 0;
                    countOne = 0;
                    countTwo = 0;
                    
                }   
			}
		}
	}
    return variance;
};