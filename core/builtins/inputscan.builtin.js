const Builtin = require("./builtin");

class InputScan extends Builtin {
    typo = 'inputscan';

    perform() {
        process.stdin.resume();
        return new Promise((resolve, reject) => {
            process.stdin.on('data', (data) => {
                process.stdin.pause();
                resolve(data.toString().trim());
            });
        });
    }
}

module.exports = InputScan;