const Program = require("../globals/program");

class Call {
    typo;
    arguments;

    constructor(typo, args) {
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