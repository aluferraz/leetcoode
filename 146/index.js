/**
 * @param {number} capacity
 */

 class DLinkedList {
    
    constructor(capacity){
        this.head = null;
        this.tail = null;
        this.keyValue = {};
        this.capacity = capacity;
        this.size = 0; 
    }
    
    insert(node){
      if(node.key in this.keyValue){
        this.keyValue[node.key].value = node.value;
        return this.keyValue[node.key];
      }
        
      this.size++;
      this.keyValue[node.key] = node;
        
      if(this.size > this.capacity){
          this.dropTail()
      }
      if(this.head === null){
          this.head = node;
          node.prev = null;
      }
                             
      if(this.tail === null){
        this.tail = node;
        node.next = null;
      } else{
          this.tail.next  = node;
          node.prev = this.tail;
          node.next = null;
          this.tail = node;
      }
      return this.keyValue[node.key];
    }
    setHead(node){
        if(this.head === null){
            this.head = node;
            return;
        }
        if(this.head === node) return;
        if(node.key in this.keyValue){
            const previous = node.prev;
            if(previous){ 
              previous.next = node.next;
              if(previous.next === null){
                  this.tail = previous;
              }
              if(node.next !== null){
                  node.next.prev = previous;
              }
            }
            
        }      
        
        this.head.prev = node;
        node.prev = null;
        node.next = this.head;
        this.head = node;
    }
    
    get(key){
        if(!(key in this.keyValue)) return -1;
        let resultNode = this.keyValue[key];
       // this.setHead(resultNode);
        return resultNode;
    }
    
    dropTail(){
        if(this.tail === null ) return;
        delete this.keyValue[this.tail.key];
        this.size--;
        this.tail = this.tail.prev;
        if(this.tail !== null) this.tail.next = null; 
        
        
    }
    
}
class Node{
    constructor(key,value){
        this.prev = null;
        this.next = null;
        this.value = value;
        this.key = key;
    }
}


var LRUCache = function(capacity) {
    LRUCache.prototype.linkedList = new DLinkedList(capacity);
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    const result = LRUCache.prototype.linkedList.get(key);
    if(result  !== -1 ){
        LRUCache.prototype.linkedList.setHead(result);
        return result.value;   
    }
    return -1;
    
};

LRUCache.prototype.peek = function(){
    console.log(LRUCache.prototype.linkedList);
}

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    let node = new Node(key,value) ;
    node = LRUCache.prototype.linkedList.insert(node);
    LRUCache.prototype.linkedList.setHead(node);
    
};
