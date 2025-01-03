const Program = require("../globals/program");

class Atribuition {
    value = null;
    typo = null;

    constructor(value, typo) {
        this.value = value;
        this.typo = typo;
    }

    canDoAttribuition(variables) {
        return 1;
    }

    /**
     * 
     * @param {Program} program 
     */
    perform(program) {
        program.registerVariableValue(this.typo, this.value);
    }
}

module.exports = Atribuition;
