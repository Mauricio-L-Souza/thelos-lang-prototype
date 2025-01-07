const generator = require('../core/parser');
const tokenizer = require('../core/tokenizer');

const Scope = require('../core/globals/scope');
const If = require('../core/expressions/if.exp');
const Math = require('../core/expressions/math.exp');
const Call = require('../core/expressions/call.exp');
const Definition = require('../core/expressions/definition.exp');
const Declaration = require('../core/expressions/declaration.exp');
const Atribuition = require('../core/expressions/atribuition.exp');
const Comparision = require('../core/expressions/comparision.exp');
const Block = require('../core/expressions/block.exp');

test('test_it_can_generate_declaration_expression', () => {
    let scope = new Scope();
    scope.name = 'main';
    scope.statements = [];

    let script = generator.generate(tokenizer.parse('dec str variable;'), scope);

    expect(script).toBeInstanceOf(Scope);
    expect(script).toHaveProperty('name', 'main');

    let expression = script.statements[0];

    expect(expression).toBeInstanceOf(Declaration);
    expect(expression).toHaveProperty('value', null);
    expect(expression).toHaveProperty('type', 'str');
    expect(expression).toHaveProperty('typo', 'variable');
});

test('test_it_can_generate_atribuition_expression', () => {
    let tokens = tokenizer.parse('variable $= "string";');

    let scope = new Scope();
    scope.name = 'main';
    scope.statements = [];

    let script = generator.generate(tokens, scope);

    expect(script).toBeInstanceOf(Scope);
    expect(script).toHaveProperty('name', 'main');

    let expression = script.statements[0];

    expect(expression).toBeInstanceOf(Atribuition);
    expect(expression).toHaveProperty('value', '"string"');
    expect(expression).toHaveProperty('typo', 'variable');
});

test('test_it_can_generate_attribuition_math_expression', () => {
    let tokens = tokenizer.parse('variable $= 5 + 5;');
    let scope = new Scope();
    scope.name = 'main';
    scope.statements = [];
    let script = generator.generate(tokens, scope);

    expect(script).toBeInstanceOf(Scope);
    expect(script).toHaveProperty('name', 'main');

    let expression = script.statements[0];
    expect(expression).toHaveProperty('typo', 'variable');

    expect(expression.value).toBeInstanceOf(Math);
    expect(expression.value).toHaveProperty('left', '5');
    expect(expression.value).toHaveProperty('operand', '+');
    expect(expression.value).toHaveProperty('right', '5');
});

test('test_it_can_generate_math_expression', () => {
    let tokens = tokenizer.parse('5 + 5;');
    let scope = new Scope();
    scope.name = 'main';
    scope.statements = [];
    let script = generator.generate(tokens, scope);

    expect(script).toBeInstanceOf(Scope);
    expect(script).toHaveProperty('name', 'main');

    let expression = script.statements[0];
    expect(expression).toBeInstanceOf(Math);
    expect(expression).toHaveProperty('left', '5');
    expect(expression).toHaveProperty('operand', '+');
    expect(expression).toHaveProperty('right', '5');
});

test('test_it_can_generate_comparision_expression', () => {
    let tokens = tokenizer.parse('5 &gt 5;');
    let scope = new Scope();
    scope.name = 'main';
    scope.statements = [];
    let script = generator.generate(tokens, scope);

    expect(script).toBeInstanceOf(Scope);
    expect(script).toHaveProperty('name', 'main');

    let expression = script.statements[0];
    expect(expression).toBeInstanceOf(Comparision);
    expect(expression).toHaveProperty('left', '5');
    expect(expression).toHaveProperty('operand', '&gt');
    expect(expression).toHaveProperty('right', '5');
});

test('test_it_can_generate_attribuition_comparision_expression', () => {
    let tokens = tokenizer.parse('variable $= 5 &gt 5;');
    let scope = new Scope();
    scope.name = 'main';
    scope.statements = [];
    let script = generator.generate(tokens, scope);

    expect(script).toBeInstanceOf(Scope);
    expect(script).toHaveProperty('name', 'main');

    let expression = script.statements[0];
    expect(expression).toHaveProperty('typo', 'variable');

    expect(expression.value).toBeInstanceOf(Comparision);
    expect(expression.value).toHaveProperty('left', '5');
    expect(expression.value).toHaveProperty('operand', '&gt');
    expect(expression.value).toHaveProperty('right', '5');
});

test('test_it_can_generate_conditional_verificarion', () => {
    let tokens = tokenizer.parse('dec auto variable;\nvariable $= 1;\nif variable &gt 5 -> variable $= 10 else -> variable $= 2;');
    let scope = new Scope();
    scope.name = 'main';
    scope.statements = [];
    let script = generator.generate(tokens, scope);

    expect(script).toBeInstanceOf(Scope);
    expect(script).toHaveProperty('name', 'main');

    let expression = script.statements[2];

    expect(expression).toBeInstanceOf(If);

    expect(expression.condition).toBeInstanceOf(Comparision);
    expect(expression.condition).toHaveProperty('left', 'variable');
    expect(expression.condition).toHaveProperty('operand', '&gt');
    expect(expression.condition).toHaveProperty('right', '5');

    expect(expression.implies).toBeInstanceOf(Atribuition);
    expect(expression.implies).toHaveProperty('value', '10');
    expect(expression.implies).toHaveProperty('typo', 'variable');

    expect(expression.otherwise).toBeInstanceOf(Atribuition);
    expect(expression.otherwise).toHaveProperty('value', '2');
    expect(expression.otherwise).toHaveProperty('typo', 'variable');

});

test('test_it_can_generate_call_without_arguments_expression', () => {
    let tokens = tokenizer.parse('method_name => ;');
    let scope = new Scope();
    scope.name = 'main';
    scope.statements = [];
    let script = generator.generate(tokens, scope);

    expect(script).toBeInstanceOf(Scope);
    expect(script).toHaveProperty('name', 'main');

    let expression = script.statements[0];
    expect(expression).toBeInstanceOf(Call);
    expect(expression).toHaveProperty('typo', 'method_name');
});

test('test_it_can_generate_call_with_one_argument_expression', () => {
    let tokens = tokenizer.parse('method_name => "string";');
    let scope = new Scope();
    scope.name = 'main';
    scope.statements = [];
    let script = generator.generate(tokens, scope);

    expect(script).toBeInstanceOf(Scope);
    expect(script).toHaveProperty('name', 'main');

    let expression = script.statements[0];
    expect(expression).toBeInstanceOf(Call);
    expect(expression).toHaveProperty('typo', 'method_name');
    expect(expression.arguments).toStrictEqual(['"string"']);
});

test('test_it_can_generate_call_with_more_than_one_argument_expression', () => {
    let tokens = tokenizer.parse('method_name => 50, "string";');
    let scope = new Scope();
    scope.name = 'main';
    scope.statements = [];
    let script = generator.generate(tokens, scope);

    expect(script).toBeInstanceOf(Scope);
    expect(script).toHaveProperty('name', 'main');

    let expression = script.statements[0];
    expect(expression).toBeInstanceOf(Call);
    expect(expression).toHaveProperty('typo', 'method_name');

    expect(expression.arguments).toStrictEqual(["50", '"string"']);
});

test('test_it_can_generate_definition_without_argument_expression', () => {
    let tokens = tokenizer.parse('method sayHello :> -> outputln => "Hello world!";');
    let scope = new Scope();
    scope.name = 'main';
    scope.statements = [];

    let script = generator.generate(tokens, scope);

    expect(script).toBeInstanceOf(Scope);
    expect(script).toHaveProperty('name', 'main');

    let expression = script.statements[0];
    expect(expression).toBeInstanceOf(Definition);
    expect(expression).toHaveProperty('typo', 'sayHello');
    expect(expression.body).toBeInstanceOf(Call);
    expect(expression.args.length).toBe(0);
});

test('test_it_can_generate_definition_with_one_argument_expression', () => {
    let tokens = tokenizer.parse('method sayHello :> dec str name -> outputln => "Hello world!";');
    let scope = new Scope();
    scope.name = 'main';
    scope.statements = [];

    let script = generator.generate(tokens, scope);

    expect(script).toBeInstanceOf(Scope);
    expect(script).toHaveProperty('name', 'main');

    let expression = script.statements[0];
    expect(expression).toBeInstanceOf(Definition);
    expect(expression).toHaveProperty('typo', 'sayHello');
    expect(expression.body).toBeInstanceOf(Call);
    expect(expression.args.length).toBe(1);

    expect(expression.args[0]).toBeInstanceOf(Declaration);
    expect(expression.args[0]).toHaveProperty('value', null);
    expect(expression.args[0]).toHaveProperty('type', 'str');
    expect(expression.args[0]).toHaveProperty('typo', 'name');
});

test('test_it_can_generate_definition_with_more_than_one_argument_expression', () => {
    let tokens = tokenizer.parse('method math :> dec number a, dec number b -> a + b -> a + b;');

    let scope = new Scope();
    scope.name = 'main';
    scope.statements = [];

    let script = generator.generate(tokens, scope);

    expect(script).toBeInstanceOf(Scope);
    expect(script).toHaveProperty('name', 'main');

    let expression = script.statements[0];

    expect(expression).toBeInstanceOf(Definition);
    expect(expression).toHaveProperty('typo', 'math');
    expect(expression.body).toBeInstanceOf(Math);
    expect(expression.args.length).toBe(2);

    expect(expression.args[0]).toBeInstanceOf(Declaration);
    expect(expression.args[0]).toHaveProperty('value', null);
    expect(expression.args[0]).toHaveProperty('type', 'number');
    expect(expression.args[0]).toHaveProperty('typo', 'a');

    expect(expression.args[1]).toBeInstanceOf(Declaration);
    expect(expression.args[1]).toHaveProperty('value', null);
    expect(expression.args[1]).toHaveProperty('type', 'number');
    expect(expression.args[1]).toHaveProperty('typo', 'b');
});

test('test_it_can_generate_definition_with_block_expression', () => {
    let tokens = tokenizer.parse('method math :> dec number a, dec number b -> start outputln => "entrou no bloco"; a + b; outputln => "processou do bloco"; end');

    let scope = new Scope();
    scope.name = 'main';
    scope.statements = [];

    let script = generator.generate(tokens, scope);

    expect(script).toBeInstanceOf(Scope);
    expect(script).toHaveProperty('name', 'main');

    let expression = script.statements[0];

    expect(expression).toBeInstanceOf(Definition);
    expect(expression).toHaveProperty('typo', 'math');
    expect(expression.args.length).toBe(2);

    expect(expression.args[0]).toBeInstanceOf(Declaration);
    expect(expression.args[0]).toHaveProperty('value', null);
    expect(expression.args[0]).toHaveProperty('type', 'number');
    expect(expression.args[0]).toHaveProperty('typo', 'a');

    expect(expression.args[1]).toBeInstanceOf(Declaration);
    expect(expression.args[1]).toHaveProperty('value', null);
    expect(expression.args[1]).toHaveProperty('type', 'number');
    expect(expression.args[1]).toHaveProperty('typo', 'b');

    expect(expression.body).toBeInstanceOf(Block);
    let block = expression.body;
    expect(block.statements.length).toBe(3);
    expect(block.statements[0]).toBeInstanceOf(Call);
    expect(block.statements[1]).toBeInstanceOf(Math);
    expect(block.statements[2]).toBeInstanceOf(Call);
});