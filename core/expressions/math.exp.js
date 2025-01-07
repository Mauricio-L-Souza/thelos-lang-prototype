const Expression = require("./expression");

class Math  extends Expression{
    left = null;
    operand = null;
    right = null;

    constructor(left, operand, right) {
        super();
        this.left = left;
        this.operand = operand;
        this.right = right;
    }

    perform() {
        switch (this.operand) {
            case '+':
                return Number(this.left) + Number(this.right);
            case '-':
                return Number(this.left) + Number(this.right);
            case '*':
                return Number(this.left) + Number(this.right);
            case '/':
                return Number(this.left) + Number(this.right);
        }

        throw new Error('InterpreterError: Operation not permited ' + this.operand);
    }
}

module.exports = Math;