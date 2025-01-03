const OutputLn = require("./builtins/outputln.builtin");
const { execute } = require("./execution");
const Program = require("./globals/program");

/**
 * 
 * @param {Program} program 
 */
function registerBuiltin(program) {
    program.registerBuiltin(new OutputLn);
}

function interpret(ast) {
    let program = new Program();
    registerBuiltin(program);

    let i = 0;

    while (i < ast.statements.length) {
        execute(ast.statements[i], program);
        i++;
    }

    return 1;
}

module.exports = { interpret };