/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 * 
    Plog(P) + P.S + s
    
    avg O(P.S + s)
    
    //REMEMBER: Search for each letter
    //REMEMBER: MAX 3 RESULTS
 */
    const endSymbol = '*';
    var suggestedProducts = function(products, searchWord) {
        products.sort();
        const suffixTrie = buildTrie(products);
        let result = [];
        let currentSearch = [];
        let currentBranch = suffixTrie;
        for(let i = 0; i < searchWord.length; i++){
            const currentLetter = searchWord[i];
            if(!(currentLetter in currentBranch)) {
                result.push([]);
                currentBranch = {};
                continue;
            }
            currentBranch = currentBranch[currentLetter];
            currentSearch.push(currentLetter);
            const currentSearchAsString = currentSearch.join('');
            const resultForLetter = findSuffixInTrie(currentSearchAsString,currentBranch);
            if(resultForLetter.length > 0) result.push(resultForLetter);
        }
        return result;
    };
    
    function buildTrie(products){
        var trie = {};
        let trieBranch = trie;
        
        for(let i = 0; i < products.length ;i++){
            const currentWord = products[i];
            for(let j = 0; j < currentWord.length; j++){
                const currentLetter = currentWord[j];
                if(!(currentLetter in trieBranch)){
                    trieBranch[currentLetter] = {};
                }
                trieBranch = trieBranch[currentLetter];
            }
            trieBranch[endSymbol] = true;
            trieBranch = trie;
        }
        return trie;
    }
    
    function findSuffixInTrie(searchWord, branch){
        // let branch = trie;
        // for(let i = 0;i < searchWord.length; i++){
        //     const currentLetter = searchWord[i];
        //     if(!(currentLetter in branch)) return [];
        //     branch = branch[currentLetter];
        // }
        let result = [];
        getAllWordsInBranch(searchWord, branch, [],result);
        return result;
        
    }
    function getAllWordsInBranch(searchWord, currentBranch, currentWord, arrayOfWords){
        //We need to add the searchWord as the prefix in the end
        
        for(let letter in currentBranch){
            if(letter === endSymbol && currentBranch[endSymbol] === true){
                arrayOfWords.push( searchWord + currentWord.join('') ); // base case
            }else{
               currentWord.push(letter);
               getAllWordsInBranch(searchWord, currentBranch[letter], currentWord, arrayOfWords);
               currentWord.pop();
            }
            if(arrayOfWords.length === 3) return;
        }
    }