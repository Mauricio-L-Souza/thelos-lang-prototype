const Program = require("../globals/program");

class Comparision {
    left;
    operand;
    right;

    constructor(left, operand, right) {
        this.left = left;
        this.operand = operand;
        this.right = right;
    }

    /**
     * 
     * @param {Program} program 
     */
    perform(program) {
        let left = this.__prepareValues(program, this.left);
        let right = this.__prepareValues(program, this.right);
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

    /**
     * 
     * @param {Program} program 
     */
    __prepareValues(program, value) {
        if (value.charAt(0) === "\"") {
            return JSON.parse(value).length;
        } else if (!Number.isNaN(Number(value))) {
            return Number(value);
        } else if (program.recoverVariable(value)) {
            return this.__prepareValues(program, program.recoverVariable(value));
        }
    }
}

module.exports = Comparision;