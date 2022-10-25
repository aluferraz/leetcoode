/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */

 class Heap{
    constructor(compareFn){
        this.heap = [];
        this.compare = compareFn;
    }
    
    getParentIdx(i){
        return Math.floor((i-1)/2);
    }
    
    hasParent(i){
        const parentIdx = this.getParentIdx(i);
        return parentIdx  >= 0 && parentIdx < this.heap.length ;
    }
    getLeftIdx(i){
       return (2*i) + 1 ;
    }
    hasLeft(i){
        const leftIdx = this.getLeftIdx(i);
        return leftIdx >= 0 && leftIdx < this.heap.length;
    }
    getRightIdx(i){
       return (2*i) + 2; 
    }
    getRight(i){
        return this.heap[this.getRightIdx(i)];
    }
    getLeft(i){
        return this.heap[this.getLeftIdx(i)];
    }
    hasRight(i){
        const leftIdx = this.getRightIdx(i);
        return leftIdx >= 0 && leftIdx < this.heap.length;
    }
    siftUp(i){
        //LogN
        let currentIdx = i;
        while(this.hasParent(currentIdx)){
            const parentIdx = this.getParentIdx(currentIdx);
            const parent = this.heap[parentIdx];
            const current = this.heap[currentIdx];
            if(this.compare(parent,current)){
                this.swap(parentIdx, currentIdx);
                currentIdx = parentIdx;
            }else{
                break;
            }
        }
    }
    siftDown(i){
        //LogN
        let currentIdx = i;
        while(this.hasLeft(currentIdx)){
            let smallestChild = this.getLeft(currentIdx);
            let smallestChildIdx = this.getLeftIdx(currentIdx);
            const current = this.heap[currentIdx];
            if(this.hasRight(currentIdx)){
                const rightChild = this.getRight(currentIdx);
                if(this.compare(rightChild,smallestChild)){
                    smallestChild = rightChild;
                    smallestChildIdx = this.getRightIdx(currentIdx);                    
                }
            }
           
            if(this.compare(smallestChild,current)){
                this.swap(smallestChildIdx, currentIdx);
                currentIdx = smallestChildIdx;
            }else{
                break;
            }
        }
    }
    swap(i,j){
        let temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
    insert(value){
        this.heap.push(value);
        const lastIdx = ( this.heap.length -1);
        this.siftUp(lastIdx );
    }
    size(){
        return this.heap.length;
    }
    peek(){
        return this.heap[0] ;
    }
    remove(){
        const resultValue = this.peek();
        this.heap[0] = this.heap.pop();
        this.siftDown(0);
        return resultValue;
    }
    build(array){
        this.heap = array;
        if(array.length === 0 ) return;
        let lastIdx =  this.heap.length - 1;
        let currentIdx = this.getParentIdx(lastIdx);
        while(currentIdx >= 0) {
            this.siftDown(currentIdx);
            currentIdx--;
        }
    }
    
}

const compareFnMinHeap = (valueA,ValueB) =>{
    if(valueA[0] < ValueB[0]) return true;
    return false;
}

var kClosest = function(points, k) {
    const target = [0,0];
    const specialMinHeap = new Heap(compareFnMinHeap);
    let arrayWithDistances = [];
    for(let pointIdx in points){
        const currentCoord = points[pointIdx];
        const currentDistance = getDistance(currentCoord, target);
        arrayWithDistances.push( [currentDistance, currentCoord[0],currentCoord[1]] );
    }
    specialMinHeap.build(arrayWithDistances);
    let result = [];
    for(let i = 0; i < k; i++){
        const coordWithDistance = specialMinHeap.remove();
        result.push( [ coordWithDistance[1],coordWithDistance[2] ]);    
    }
    
    return result;
};

function getDistance(coord, target){
    const xSquareDiff = ( ( coord[0] - target[0]  ) * ( coord[0] - target[0]  ) );
    const ySquareDiff =  ( ( coord[1] - target[1]  ) * ( coord[1] - target[1]  ) );
    return Math.sqrt(  xSquareDiff +  ySquareDiff  );
}