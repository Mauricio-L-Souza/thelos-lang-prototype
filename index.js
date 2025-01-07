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
