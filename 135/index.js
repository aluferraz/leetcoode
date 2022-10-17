

var candy = function (ratings) {
    let candies = Array(ratings.length).fill(1);
    for (let i = 1; i < ratings.length; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }
    for (let i = ratings.length - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1] && candies[i] <= candies[i + 1]) {
            candies[i] = candies[i + 1] + 1;
        }
    }
    return candies.reduce((a, b) => { return a + b }, 0);
}

console.log(candy([5, 4, 3, 2, 1, 2, 3, 0]));
// //TLE:
// var candy = function (ratings) {
//     if (ratings.length <= 1) return ratings.length;
//     let candies = Array(ratings.length).fill(1);
//     let queue = new Queue();
//     for (let i = 0; i < ratings.length; i++) {
//         queue.enqueue(i);
//     }
//     let minCandies = ratings.length;
//     while (queue.size() > 0) {
//         let size = queue.size();
//         for (let i = 0; i < size; i++) {
//             let childIdx = queue.dequeue();
//             if (
//                 isValidIdx(childIdx - 1, ratings) &&
//                 ratings[childIdx] > ratings[childIdx - 1] &&
//                 candies[childIdx] <= candies[childIdx - 1]
//             ) {
//                 candies[childIdx]++;
//                 minCandies++;
//                 queue.enqueue((childIdx - 1));
//                 if (isValidIdx(childIdx + 1, ratings)) queue.enqueue((childIdx + 1));
//             }
//             if (
//                 isValidIdx(childIdx + 1, ratings) &&
//                 ratings[childIdx] > ratings[childIdx + 1] &&
//                 candies[childIdx] <= candies[childIdx + 1]
//             ) {
//                 candies[childIdx]++;
//                 minCandies++;
//                 if (isValidIdx(childIdx - 1, ratings)) queue.enqueue((childIdx - 1));
//                 queue.enqueue((childIdx + 1));
//             }
//         }
//     }

//     return minCandies;

// };

// function isValidIdx(idx, array) {
//     return idx >= 0 && idx < array.length;
// }

// const { Queue } = require('../IMPORT_CLASSES/node_modules/@datastructures-js/queue');



