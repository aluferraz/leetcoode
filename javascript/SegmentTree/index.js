

//https://www.youtube.com/watch?v=xztU7lmDLv8

class SegmentTree {
    constructor(arr, fn) {
        this.tree = Array(arr.length).fill(0).concat(arr);
        this.n = arr.length - 1;

        this.buildTree(n);
        this.fn = fn;
    }

    buildTree(n) {
        for (let i = this.n; i >= 0; i--) {
            this.tree[i] = this.fn(this.tree[2 * i], this.tree[(2 * i) + 1]); //If N is odd, the first position can be discarted
        }
    }

    update(i, val) {
        //We start from the leaf nodes;
        i += this.n;
        this.tree[i] = val;
        while (i > 1) {
            i = i / 2;
            let newValue = this.fn(this.tree[2 * i], this.tree[(2 * i) + 1]);
            if (this.tree[i] !== newValue) {
                this.tree[i] = newValue;
            } else {
                return; // No need to update 
            }
        }
    }

    find(from, to) {
        from += this.n;
        to += this.n;

        let result = null; //E.g: from max range, you pass fn = Math.max(a,b) and initialValue = -Infinity
        while (from < to) {
            if (from % 2 === 1) {
                result = result === null ? this.tree[from] : this.fn(result, this.tree[from]);
                from++;
            }
            if (to % 2 === 1) {
                to--;//We subtract it first!!
                result = result === null ? this.tree[to] : this.fn(result, this.tree[to]);
            }

            from = from / 2;
            to = to / 2;
        }
        return result;
    }
}