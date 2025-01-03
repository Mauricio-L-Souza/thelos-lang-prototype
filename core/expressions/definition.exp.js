const Program = require("../globals/program");

class Definition {
    args = [];
    body = null;
    typo = null;

    constructor(typo, args, body) {
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
