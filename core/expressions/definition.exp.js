const Program = require("../globals/program");
const Expression = require("./expression");

class Definition extends Expression {
    args = [];
    body = null;
    typo = null;

    constructor(typo, args, body) {
        super();
        this.args = args;
        this.body = body;
        this.typo = typo;
    }

    canExecuteMethod(variables) {
        return 1;
    }

    /**
     * 
     * @param {Program} program 
     */
    perform(program) {
        program.registerMethod(this);
    }
}

module.exports = Definition;
