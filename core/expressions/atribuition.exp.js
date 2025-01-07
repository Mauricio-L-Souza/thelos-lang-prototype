const Program = require("../globals/program");
const Expression = require("./expression");

class Atribuition extends Expression {
    value = null;
    typo = null;

    constructor(value, typo) {
        super();
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
