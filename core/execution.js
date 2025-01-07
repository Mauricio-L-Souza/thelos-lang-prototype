const If = require("./expressions/if.exp");
const Program = require("./globals/program");
const Builtin = require("./builtins/builtin");
const Math = require("./expressions/math.exp");
const Call = require("./expressions/call.exp");
const Block = require("./expressions/block.exp");
const { prepare_value } = require("./globals/utils");
const Expression = require("./expressions/expression");
const Definition = require("./expressions/definition.exp");
const Atribuition = require("./expressions/atribuition.exp");
const Declaration = require("./expressions/declaration.exp");
const Comparision = require("./expressions/comparision.exp");

/**
 * @param {Object} statement
 * @param {Program} program 
 */
function execute(statement, program) {
    if (statement instanceof Declaration) {
        if (statement.canDoDeclaration(program) === 3) return 3;
        return statement.perform(program);
    }

    if (statement instanceof Atribuition) {
        if (statement.canDoAttribuition(program) === 2) return 2;
        if (typeof statement.value === 'string') {
            return statement.perform(program);
        }

        statement.value = execute(statement.value);
        return statement.perform(program)
    }

    if (statement instanceof Math) {
        return statement.perform();
    }

    if (statement instanceof Comparision) {
        return statement.perform(program)
    }

    if (statement instanceof If) {

        let resolved = execute(statement.condition, program);
        if (resolved) execute(statement.implies, program);
        if (statement.otherwise && !resolved) {
            execute(statement.otherwise, program);
        }

        return;
    }

    if (statement instanceof Call && program.recoverMethod(statement.typo)) {
        let method = program.recoverMethod(statement.typo);

        let args = [];

        for (const arg of statement.arguments) {
            if (arg instanceof Expression) {
                args.push(execute(arg, program));
                continue;
            }
            args.push(prepare_value(program, arg));
        }

        if (method instanceof Builtin) {
            return method.perform(args);
        }

        if (method instanceof Definition) {
            for (const param of method.args) {
                let oldParamTypo = param.typo;
                param.typo = 'method.$.' + oldParamTypo;
                execute(param, program);
                param.typo = oldParamTypo;
            }

            execute(method.body, program);

            for (const param of method.args) {
                program.flushVariable('method.$.' + param.typo);
            }

            return;
        }

        throw new Error('InterpreterError: method type not implemented');
    }

    if (statement instanceof Block) {
        for (const expression of statement.statements) {
            execute(expression, program);
        }

        return;
    }

    if (statement instanceof Definition) {
        statement.perform(program);
        return;
    }


    throw new Error('InterpreterError: Unrecognized expression ' + statement.constructor.name);
}

module.exports = { execute };
