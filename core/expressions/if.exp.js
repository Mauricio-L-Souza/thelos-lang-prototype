class If {
    implies;
    otherwise;
    condition;

    constructor(condition, implies, otherwise) {
        this.condition = condition;
        this.implies = implies;
        this.otherwise = otherwise;
    }
}

module.exports = If;