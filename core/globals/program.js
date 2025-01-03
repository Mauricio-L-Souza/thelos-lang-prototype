const Builtin = require("../builtins/builtin");

class Program {
    __methods = {};
    __builtins = {};
    __variables = {};

    registerMethod(definition) {
        if (this.__builtins[definition.typo]) {
            throw new Error('InterpretError: cannot redeclare internal method ' + definition.typo);
        }

        if (this.__methods[definition.typo]) {
            throw new Error('InterpretError: cannot redeclare method ' + definition.typo);
        }

        this.__methods[definition.typo] = definition;
    }

    registerBuiltin(builtin) {
        this.__builtins[builtin.typo] = builtin;
    }

    registerVariable(typo) {
        this.__variables[typo] = null;
    }

    registerVariableValue(typo, value) {

        this.recoverVariable(typo);
        this.__variables[typo] = value;
    }

    recoverVariable(typo) {

        const variable = this.__variables[typo];
        if (variable === undefined) {
            throw new Error('InterpretError: cannot recover undeclared variable ' + typo);
        }

        return variable;
    }

    recoverBuiltin(typo) {
        if (this.__builtins[typo] instanceof Builtin) {
            return true;
        }

        return false;
    }

    recoverMethod(typo) {
        let method = this.__methods[typo] || this.__builtins[typo] || undefined;
        if (method === undefined) {
            throw new Error('InterpretError: cannot recover undeclared method ' + typo);
        }

        return method;
    }

    flushVariable(typo) {
        delete this.__variables[typo];
    }
}

module.exports = Program;
