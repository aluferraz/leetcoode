/**
 * @param {string[]} logs
 * @return {string[]}
 */
// Discard the indentifier for sorting - > edge cases only
// Sort the letter logs
// append the digit logs after
var reorderLogFiles = function(logs) {
    let lettersArray = [];
    let numbersArray = [];

    for(let i = 0; i < logs.length; i++){
        const currentLog = logs[i];
        const logAsArray = currentLog.split(' '); 
        if(!isNaN( logAsArray[1] )){
            numbersArray.push(currentLog);
            continue;
        }; //Propmt guarantees length 
        lettersArray.push( logAsArray );
    } 
    lettersArray.sort((a,b) =>{
        
        const str1 = a.slice(1).join(' ');
        const str2 = b.slice(1).join(' ');
        
        if(str1 === str2){ // Edge case
            if(a[0] > b[0]) return 1;
            if(a[0] < b[0]) return -1;
            if(a[0] === b[0]) return 0;
        }
        
        if(str1 > str2) return 1;
        if(str1 < str2) return -1;
        if(str1 === str2) return 0;
    });
    
    return lettersArray.map((a)=>{return a.join(' ')}) .concat(numbersArray);   

};