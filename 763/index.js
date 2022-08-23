
var partitionLabels = function(s) {
    if(s.length === 0)  return [];
    let idxOfLetters = getIdxRanges(s);
    const partitions = []; 
    let currentRange = [0,1];
    let distinctLetters = Object.keys(idxOfLetters);
    for( let i = 0; i < distinctLetters.length ; i++  ){
      const currentChar = distinctLetters[i];
      const rangeForChar = idxOfLetters[currentChar];
      const firstSawAt = rangeForChar[0];
      const lastSawAt = rangeForChar[1];
      //Is part of that same partition
      if(
          firstSawAt >= currentRange[0] &&
          firstSawAt < currentRange[1]
        ){
         currentRange[1] = Math.max( currentRange[1] ,( lastSawAt + 1 ));
      }else{
      // start a new partition
          partitions.push(currentRange[1] - currentRange[0]);
          currentRange[0] = firstSawAt;
          currentRange[1] = lastSawAt+1;
      }
    }
    partitions.push( currentRange[1] - currentRange[0] );
    return partitions;
     
 };
 
 
 
 function getIdxRanges(string){
     const letterMap = {};
     //Creating a range for each letter
     for( let i = 0; i < string.length ; i++  ){
         const currentChar = string[i];
         if(!(currentChar in letterMap)){
             letterMap[currentChar] = [i,i]; //Occurs once
         }else{
             letterMap[currentChar][1] = i; //Occurs more the once, update the last idx
         }
     }
     return letterMap;
 }