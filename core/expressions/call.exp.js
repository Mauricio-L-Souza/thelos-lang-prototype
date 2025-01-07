const Program = require("../globals/program");
const Expression = require("./expression");

class Call extends Expression {
    typo;
    arguments;

    constructor(typo, args) {
        super();
        this.typo = typo;
        this.arguments = args;
    }

    /**
     * 
     * @param {Program} program 
     */
    canDoCall(program) {
        program.recoverMethod(this.typo);
    }
}

module.exports = Call;