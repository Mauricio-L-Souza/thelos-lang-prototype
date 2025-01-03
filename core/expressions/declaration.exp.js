const Program = require("../globals/program");

class Declaration {
    value = null;
    typo = null;
    type = null;

    constructor(type, typo) {
        this.type = type;
        this.typo = typo;
    }

    /**
     * 
     * @param {Program} program 
     */
    canDoDeclaration(program) {
        // if (program.recoverVariable(this.typo)) return 3;
        return 1;
    }

    /**
     * 
     * @param {Program} program 
     */
    perform(program) {
        program.registerVariable(this.typo);
    }
}

module.exports = Declaration;