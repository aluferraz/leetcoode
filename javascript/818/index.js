/**
 * @param {number} target
 * @return {number}
 */
 var racecar = function (target) {
    let visited = new Set();
    let queue = new Queue();
    queue.enqueue([0, 1, 0]);
    visited.add("0-1");

    while (queue.size() > 0) {
        let size = queue.size();
        for (let i = 0; i < size; i++) {
            let [pos, speed, path] = queue.dequeue();
            if (target === pos) {
                return path;
                //return path.join('');
            }
            let accelerate = pos + speed;
            let aKey = accelerate.toString() + '-' + (speed * 2).toString();
            if (!visited.has(aKey)) {
                // let subPath = path.slice();
                // subPath.push('A');
                queue.enqueue([accelerate, (speed * 2), path + 1])
                visited.add(aKey);

            }
            if ((pos + speed > target && speed > 0) || (pos + speed < target && speed < 0)) {
                let revSpeed = speed > 0 ? -1 : 1;
                let reverse = pos;
                let rKey = reverse.toString() + '-' + revSpeed.toString();
                if (!visited.has(rKey)) {
                    // let subPath = path.slice();
                    // subPath.push('R');
                    queue.enqueue([reverse, revSpeed, path + 1]);
                    visited.add(rKey);

                }
            }

        }
    }

};


const { Queue } = require('../IMPORT_CLASSES/node_modules/@datastructures-js/queue');



console.log(racecar(5478));
