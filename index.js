// function inputscan() {
//     process.stdin.resume();
//     return new Promise((resolve, reject) => {
//         process.stdin.on('data', (data) => {
//             process.stdin.pause();
//             resolve(data.toString().trim());
//         });
//     });
// }

// async function main() {
//     process.stdout.write('>> ');
//     let value = await inputscan();
//     console.log({ value });
// }

// variable $= main => "asdasd", "asdasd", "asdasd";

const Scope = require('./core/globals/scope');
const generator = require('./core/parser');
const tokenizer = require('./core/tokenizer');
const interpreter = require('./core/interpreter');

let scope = new Scope();
// let tokens = tokenizer.parse('dec str variable; variable $= 1; if variable &lt 0 -> outputln => "maior";');
let tokens = tokenizer.parse(`
    outputln => "Iniciou o código";
    dec str variable;

    method sayHello :> -> outputln => "Hello!";

    sayHello =>;
    outputln => "Finalizou o código";
`);

scope = generator.generate(tokens, scope);

interpreter.interpret(scope);
