/**
 * @param {number[]} books
 * @return {number}
 */
var maximumBooks = function (books) {
    debugger
    if (books.length === 0) return 0;
    //First we check how far we can acommodate our numbers.
    //E.g: [0,5, 4]-> If we pick 5 from the second shelf,
    //we can spread (5-1), (5-2), (5,3), (5-4), and (5-5)
    //on the previous shelfs IF WE HAVE ENOUGH books there.
    //So let's use a modified Previous Less Element implementation
    //to calculate that
    let rangeOfSpread = modifiedPLE(books);
    //We start taking the first shelf in full
    let maxBooks = books[0];
    let currentBooksSum = books[0];
    let minBooksToTake = books[0];
    //Dynamic Programming Array
    let maxBooksArray = Array(books.length).fill(0);
    maxBooksArray[0] = books[0];
    for (let i = 1; i < books.length; i++) {
        if (books[i] > minBooksToTake) { //Strictly more
            //We have more books that the minimum, so take than all
            currentBooksSum += books[i];
        } else {
            //We can't use the full previous shelf anymore
            let maximumSpread = i - rangeOfSpread[i];
            if (rangeOfSpread[i] < 0) { //This means that we can take the maximum of every shell behind us
                maximumSpread = i + 1; //i is the number of shelfs behind us, we sum 1 to include the current shelf.
            }
            //We take the diff
            maximumSpread = books[i] - maximumSpread;

            //Even if we don't have any shelfs that wont fit, 
            //We can only go as far as the number of shelfs
            //1 + 2 + 3 + .... books[i]
            const fullSpread = naturalSum(books[i]);
            //Comment on Line 11 explains
            const spreadThatWontFit = naturalSum(maximumSpread);
            //When we reach a shelf that we can't spread anymore, we just need to sum the maximum that the shelf can take.
            const sumOfRemainingBooks = rangeOfSpread[i] >= 0 ? maxBooksArray[rangeOfSpread[i]] : 0;
            
            currentBooksSum = fullSpread - spreadThatWontFit + sumOfRemainingBooks;
        }
        minBooksToTake = books[i]; //The current book is now the minimum
        maxBooks = Math.max(currentBooksSum, maxBooks); //Keep track of max
        maxBooksArray[i] = currentBooksSum; //Dynamic Programming Array
    }
    return maxBooks;
}

function modifiedPLE(array) {
    let stack = [];
    let PLE = Array(array.length).fill(-1);
    for (let i = array.length - 1; i >= 0; i--) {
        while (stack.length > 0) {
            //The number on top - the distance we are from that number
            //And we can't have negatives
            let booksToSpread = Math.max((array[stack[stack.length - 1]] - (stack[stack.length - 1] - i)), 0);
            if (array[i] < booksToSpread) {
                //won't fit that many books
                PLE[stack.pop()] = i;
            } else {
                //More readable
                break;
            }
        }
        stack.push(i);
    }
    return PLE;
}
//Sum from 1 +2 + 3 + ... n 
function naturalSum(n) {
    if (n <= 0) return 0; //Modification to make it easier
    return (n * (n + 1)) / 2;
}
maximumBooks([20,10,4,17,13,11,9])
