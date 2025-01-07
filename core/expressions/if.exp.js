const Expression = require("./expression");

class If extends Expression {
    implies;
    otherwise;
    condition;

    constructor(condition, implies, otherwise) {
        super();
        this.condition = condition;
        this.implies = implies;
        this.otherwise = otherwise;
    }
}

module.exports = If;