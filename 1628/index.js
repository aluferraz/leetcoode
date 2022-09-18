/**
 * This is the interface for the expression tree Node.
 * You should not remove it, and you can define some classes to implement it.
 */

var Node = function () {
    if (this.constructor === Node) {
        throw new Error('Cannot instanciate abstract class');
    }
};

Node.prototype.evaluate = function () {
    throw new Error('Cannot call abstract method')
};


class MathExpElement {
    constructor(value) {
        this.value = null;
        this.exp = null;
        if (!isNaN(value)) {
            this.value = value;
        }
        else if (value.constructor && value.constructor !== MathExp) {
            this.exp = value;
        } else {
            throw new Error("Invalid value");
        }
    }
    get() {
        if (this.value !== null) return this.value;
        return this.exp.evalute(); // Review
    }
}

class MathExp {
    constructor(op, firstElement = null, secondElement = null) {
        this.firstElement = firstElement;
        this.secondElement = secondElement;
        switch (op) {
            case "+":
                this.fn = this.sum;
                break;
            case "-":
                this.fn = this.minus;
                break;
            case "/":
                this.fn = this.div;
                break;
            case "*":
                this.fn = this.mul;
                break;
            default:
                throw new Error("Operation not supported")
        }
    }
    evaluate() {
        if (this.firstElement === null || this.secondElement === null) {
            throw new Exception("Incomplete expression")
        }
        return this.fn(this.firstElement, this.secondElement);
    }
    setElement(value, target) {
        if (value.constructor !== MathExpElement) {
            throw new Error("Invalid param");
        }
        target = value;
    }
    setFistElement(value) {
        this.setElement(value, this.firstElement);
    }
    setSecondElement(value) {
        this.setElement(value, this.secondElement);
    }
    sum(a, b) {
        return (a.get() + b.get());
    }
    minus(a, b) {
        return (a.get() - b.get());
    }
    mul(a, b) {
        return (a.get() * b.get());
    }
    div(a, b) {
        return (a.get() / b.get());
    }
}

class ExpTreeNode extends Node {
    constructor(value, left = null, right = null, parent = null) {
        super();

        this.value = value;
        this.left = left;
        this.right = right;
        this.parent = parent;
    }
    evaluate() {
        //   debugger;
        if (this.left === null && this.right === null) {
            return this.value;
        }
        const operator = this.value;
        let elementOne = new MathExpElement(this.left.evaluate());
        let elementTwo = new MathExpElement(this.right.evaluate());
        const expression = new MathExp(operator, elementOne, elementTwo);
        return expression.evaluate();
    }
}

/**
 * This is the TreeBuilder class.
 * You can treat it as the driver code that takes the postinfix input 
 * and returns the expression tree represnting it as a Node.
 */

class TreeBuilder {
    /**
     * @param {string[]} s
     * @return {Node}
     */
    buildTree(postfix) {
      //  debugger
        let operationsStack = [];
        for (let i = 0; i < postfix.length; i++) {
            let currentElement = postfix[i];
            if (!isNaN(currentElement)) {
                //Numbers cursor must be pointing to the next number
                let numberNode = new ExpTreeNode(parseInt(currentElement));
                operationsStack.push(numberNode)
                continue;
            }
            let operationNode = new ExpTreeNode(currentElement);

            operationNode.right = operationsStack.pop();
            operationNode.left = operationsStack.pop();
            operationsStack.push(operationNode)
        }
        return operationsStack.pop();
    }



}

/**
 * Your TreeBuilder object will be instantiated and called as such:
 * var obj = new TreeBuilder();
 * var expTree = obj.buildTree(postfix);
 * var ans = expTree.evaluate();
 */


var obj = new TreeBuilder();
var expTree = obj.buildTree(["4","2","+","3","5","1","-","*","+"]);
console.log(expTree.evaluate());

