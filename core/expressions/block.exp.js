const Expression = require("./expression");

class Block extends Expression {
    statements;
    constructor(statements) {
        super();
        this.statements = statements;
    }
}

module.exports = Block;