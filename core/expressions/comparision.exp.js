const Program = require("../globals/program");
const { prepare_value } = require("../globals/utils");
const Expression = require("./expression");

class Comparision  extends Expression{
    left;
    operand;
    right;

    constructor(left, operand, right) {
        super();
        this.left = left;
        this.operand = operand;
        this.right = right;
    }

    /**
     * 
     * @param {Program} program 
     */
    perform(program) {
        let left = prepare_value(program, this.left);
        let right = prepare_value(program, this.right);
        switch (this.operand) {
            case '&eq':
                return left === right;
            case '&neq':
                return left !== right;
            case '&gt':
                return left > right;
            case '&lt':
                return left < right;
            case '&gte':
                return left >= right;
            case '&lte':
                return left <= right;
        }
    }
}

module.exports = Comparision;