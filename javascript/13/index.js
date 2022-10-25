/**
 * @param {string} s
 * @return {number}
 */
 var romanToInt = function(s) {
    let result = 0;
    let mapValues = {
        "I":1,
        "V":5,
        "X":10,
        "L":50,
        "C":100,
        "D":500,
        "M":1000,
    };
    let lastChar = null;
    let lastValue = null
    for(let i = 0; i < s.length ; i++){
        let currentChar = s.charAt(i);
        let value = mapValues[currentChar];
        
        if( 
            ( (currentChar === 'X' || currentChar === 'V' ) && lastChar === 'I' ) ||
            ( (currentChar === 'L' || currentChar === 'C' ) && lastChar === 'X' ) ||
            ( (currentChar === 'D' || currentChar === 'M' ) && lastChar === 'C' )
            ){
            value = (value - lastValue); //Actual value
            result = (result - lastValue) // Undo previous sum
                     + value ;
        }
        else{
            result += value;
        }

        lastChar = currentChar;
        lastValue = mapValues[lastChar];
   }
    return result;
};