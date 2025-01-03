const Builtin = require("./builtin");

class OutputLn extends Builtin {
    typo = 'outputln';

    perform(str) {
        process.stdout.write(str + "\n");
    }
}

module.exports = OutputLn;