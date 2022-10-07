
class Node {
    constructor(timestamp, value) {
        this.timestamp = timestamp;
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null;
        this.timestampMap = new Map();
    }
    insert(node) {
        if (this.root === null) {
            this.root = node;
        } else {
            let current = this.root;
            let parent = null;
            while (current !== null) {
                if (node.timestamp >= current.timestamp) {
                    parent = current;
                    current = node.right;
                } else {
                    parent = current;
                    current = node.left;
                }
            }
            if (node.timestamp >= parent.timestamp) {
                parent.right = node;
            } else {
                parent.left = node;
            }
        }
        this.timestampMap.set(node.timestamp, node);
    }

    get(timestamp) {
        if (this.timestampMap.has(timestamp)) {
            return this.timestampMap.get(timestamp);
        }
        return null

    }
    getClosest(timestamp) {
        let current = this.root;
        let closest = this.get(timestamp);
        if (closest !== null) return closest; //Exact match
        while (current !== null) {
            if (current.timestamp <= timestamp) {
                closest = current;
            }
            if (current.timestamp === timestamp) return current;
            if (timestamp > current.timestamp) {
                current = current.right;
            } else {
                current = current.left;
            }

        }
        return closest;

    }
}




var TimeMap = function () {
    //bst 
    this.map = new Map();
};

/** 
 * @param {string} key 
 * @param {string} value 
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function (key, value, timestamp) {
    if (!this.map.has(key)) {// new key
        this.createNew(key, value, timestamp);
    } else {
        let BST = this.map.get(key)
        let timestampNode = new Node(timestamp, value);
        BST.insert(timestampNode)
    }



};

TimeMap.prototype.createNew = function (key, value, timestamp) {
    let timestampNode = new Node(timestamp, value);
    let BST = new BinarySearchTree();
    BST.insert(timestampNode)
    this.map.set(key, BST);
}

/** 
 * @param {string} key 
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function (key, timestamp) {
    if (this.map.has(key)) {
        let BST = this.map.get(key);
        let node = BST.getClosest(timestamp);
        if (node !== null) {
            return node.value;
        }
    }
    return "";

};

/** 
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */

let timeMap = new TimeMap();
console.log((timeMap.set("ctondw", "ztpearaw", 1)));
console.log((timeMap.set("vrobykydll", "hwliiq", 2)));
console.log((timeMap.set("gszaw", "ztpearaw", 3)));
console.log((timeMap.set("ctondw", "gszaw", 4)));
debugger;
console.log((timeMap.get("gszaw", 5)));
console.log((timeMap.get("ctondw", 6)));
console.log((timeMap.get("ctondw", 7)));
console.log((timeMap.get("gszaw", 8)));
console.log((timeMap.get("vrobykydll", 9)));
console.log((timeMap.get("ctondw", 10)));
console.log((timeMap.set("vrobykydll", "kcvcjzzwx", 11)));
console.log((timeMap.get("vrobykydll", 12)));
console.log((timeMap.get("ctondw", 13)));
console.log((timeMap.get("vrobykydll", 14)));
console.log((timeMap.set("ztpearaw", "zondoubtib", 15)));
console.log((timeMap.set("kcvcjzzwx", "hwliiq", 16)));
console.log((timeMap.set("wtgbfvg", "vrobykydll", 17)));
console.log((timeMap.set("hwliiq", "gzsiivks", 18)));
console.log((timeMap.get("kcvcjzzwx", 19)));
console.log((timeMap.get("ztpearaw", 20)));