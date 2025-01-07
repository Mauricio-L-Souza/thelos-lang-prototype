const Builtin = require("./builtin");

class OutputLn extends Builtin {
    typo = 'outputln';

    perform(str) {
        let isArray = Array.isArray(str);

        if (isArray && str.length > 1) {
            throw new Error('ExecutionError: builtin outputln function expects only 1 arg, ' + str.length + ' passed.');
        }

        if (isArray) str = str[0];

        process.stdout.write(str + "\n");
    }
}

module.exports = OutputLn;