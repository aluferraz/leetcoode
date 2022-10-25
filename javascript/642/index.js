/**
 * @param {string[]} sentences
 * @param {number[]} times
 */
var AutocompleteSystem = function (sentences, times) {
    this.endingSymbol = '#';
    this.trie = {};
    this.resetSearch();

    this.buildTrie(sentences, times);

};

/** 
 * @param {character} c
 * @return {string[]}
 */
AutocompleteSystem.prototype.input = function (c) {

    if (c === this.endingSymbol) {
        debugger;
        this.updateTrie();
        this.updateFrequency();
        this.resetSearch();
        return [];
    }
    this.currentSearch.push(c);
    this.searchTrie(c);

    let result = [];
    //My heap was buggy
    // let maxHeap = new Heap([], (a, b) => {
    //     if (a.frequency > b.frequency) {
    //         return true;
    //     } else if (a.frequency < b.frequency) {
    //         return false;
    //     } else {
    //         //Same frequence, we sort lexographycally
    //         return a.setence < b.setence;
    //     }
    // });
    // for (let i = 0; i < this.resultCandidates.length; i++) {
    //     maxHeap.insert({
    //         frequency: this.resultCandidates[i].frequency,
    //         setence: this.resultCandidates[i].setence
    //     });
    // }

    this.resultCandidates.sort((a, b) => {
        if (a.frequency > b.frequency) {
            return -1;
        } else if (a.frequency < b.frequency) {
            return 1;
        } else {
            //Same frequence, we sort lexographycally
            if (a.setence < b.setence) {
                return -1;
            } else if (a.setence > b.setence) {
                return 1;
            } else {
                return 0;
            }
        }
    }
    )
    for (let i = 0; i < 3 && i < this.resultCandidates.length; i++) {
        result.push(this.resultCandidates[i].setence);
    }
    return result;
};

AutocompleteSystem.prototype.updateFrequency = function () {

    if (this.endingSymbol in this.currentTriePointer) {
        //Complete word, we need to update it's frequency
        let setenceRef = this.currentTriePointer[this.endingSymbol].ref;
        setenceRef.incrementFrequency();
    }
}

AutocompleteSystem.prototype.resetSearch = function () {
    this.currentTriePointer = this.trie;
    this.resultCandidates = [];
    this.searchRef = null;
    this.currentSearch = [];
    this.newWord = false;

}
AutocompleteSystem.prototype.updateTrie = function () {
    let searchWord = this.currentSearch.join('');
    let setenceInfo = new SetenceInfo(searchWord, 0); //First time
    if (this.endingSymbol in this.currentTriePointer) {
        //Updating only
        return;
    }
    this.currentTriePointer = this.trie; //Back to the root
    for (let i = 0; i < searchWord.length; i++) {
        this.currentTriePointer = this.insertCharInTrie(searchWord[i], this.currentTriePointer, setenceInfo);
    }
    this.insertCharInTrie(this.endingSymbol, this.currentTriePointer, setenceInfo);


}
AutocompleteSystem.prototype.searchTrie = function (c) {
    const currentLetter = c;
    if (currentLetter in this.currentTriePointer) {
        this.currentTriePointer = this.currentTriePointer[currentLetter];
        this.resultCandidates = this.currentTriePointer.setences; // Avoid ref to the heap
    } else {
        // We cannot use this result yet
        this.resultCandidates = [];
        this.currentTriePointer = {};
    }
}

AutocompleteSystem.prototype.buildTrie = function (sentences, times) {

    for (let i = 0; i < sentences.length; i++) {
        const currentSentence = sentences[i];
        const currentFrequency = times[i];
        const setenceInfo = new SetenceInfo(currentSentence, currentFrequency); // This is passed by Ref
        let currentTriePointer = this.trie;

        for (let j = 0; j < currentSentence.length; j++) {

            const currentLetter = currentSentence[j];
            currentTriePointer = this.insertCharInTrie(currentLetter, currentTriePointer, setenceInfo);
        }
        currentTriePointer = this.insertCharInTrie(this.endingSymbol, currentTriePointer, setenceInfo);

    }

};
AutocompleteSystem.prototype.insertCharInTrie = function (currentLetter, currentTriePointer, setenceInfo) {
    if (!(currentLetter in currentTriePointer)) {
        currentTriePointer[currentLetter] = {
            setences: [],
        }
    }
    currentTriePointer = currentTriePointer[currentLetter];
    currentTriePointer.setences.push(setenceInfo);
    if (currentLetter === this.endingSymbol) {
        currentTriePointer.ref = setenceInfo;
    }
    return currentTriePointer;
}
class SetenceInfo {
    constructor(setence, frequency) {
        this.setence = setence;
        this.frequency = frequency;
    }
    setSetence(setence) {
        this.setence = setence;
    }
    setFrequency(frequency) {
        this.frequency = frequency;
    }
    incrementFrequency() {
        this.frequency++;
    }
}

