const generator = require('../core/parser');
const tokenizer = require('../core/tokenizer');
const interpreter = require('../core/interpreter');

const Scope = require('../core/globals/scope');

test('test_it_can_interpret_declaration_expression', () => {
    let scope = new Scope();
    scope.name = 'program';
    scope = generator.generate(tokenizer.parse('dec auto variable;'), scope);
    expect(interpreter.interpret(scope)).toBe(1);
});

test('test_it_can_interpret_atribuition_expression', () => {
    let scope = new Scope();
    scope.name = 'program';
    scope = generator.generate(tokenizer.parse('dec auto variable;\nvariable $= "string";'), scope);
    expect(interpreter.interpret(scope)).toBe(1)
});

test('test_it_can_interpret_math_expression', () => {
    let scope = new Scope();
    scope.name = 'program';
    scope = generator.generate(tokenizer.parse('5 + 5;'), scope);
    expect(interpreter.interpret(scope)).toBe(1);
});

test('test_it_can_interpret_math_attribuition_expression', () => {
    let scope = new Scope();
    scope.name = 'program';
    scope = generator.generate(tokenizer.parse('dec auto variable;\nvariable $= 5 + 5;'), scope);
    expect(interpreter.interpret(scope)).toBe(1);
});

test('test_it_can_interpret_comparision_expression', () => {
    let scope = new Scope();
    scope.name = 'program';
    scope = generator.generate(tokenizer.parse('dec auto variable;\nvariable $= 5 &neq 5;\n'), scope);
    expect(interpreter.interpret(scope)).toBe(1);
});

test('test_it_can_interpret_comparision_attribuition_expression', () => {
    let scope = new Scope();
    scope.name = 'program';
    scope = generator.generate(tokenizer.parse('dec auto variable;\nvariable $= 5 &eq 5;'), scope);
    expect(interpreter.interpret(scope)).toBe(1);
});

test('test_it_can_interpret_if_expression', () => {
    let scope = new Scope();
    scope.name = 'program';
    let tokens = tokenizer.parse('dec auto variable;\nvariable $= 6;\nif variable &gt 5 -> variable $= "gt 5";');
    scope = generator.generate(tokens, scope);
    expect(interpreter.interpret(scope)).toBe(1);
});

test('test_it_can_interpret_if_else_expression', () => {
    let scope = new Scope();
    scope.name = 'program';

    let tokens = tokenizer.parse('dec auto variable;\nvariable $= 1;\nif variable &gt 5 -> variable $= 10 else -> variable $= 2;');
    scope = generator.generate(tokens, scope);

    expect(interpreter.interpret(scope)).toBe(1);
});

test('test_it_can_interpret_call_builtin_method_expression', () => {
    let scope = new Scope();
    scope.name = 'program';

    let tokens = tokenizer.parse('outputln => "saida";');
    scope = generator.generate(tokens, scope);

    expect(interpreter.interpret(scope)).toBe(1);
});

test('test_it_can_interpret_define_method_without_argument_expression', () => {
    let scope = new Scope();
    scope.name = 'program';

    let tokens = tokenizer.parse('method sayHello :> -> outputln "Hello World!";');
    scope = generator.generate(tokens, scope);

    expect(interpreter.interpret(scope)).toBe(1);
});

test('test_it_can_interpret_call_defined_method_expression', () => {
    let scope = new Scope();
    scope.name = 'program';

    let tokens = tokenizer.parse('method sayHello :> -> outputln => "Hello world!"; sayHello =>;');
    scope = generator.generate(tokens, scope);

    expect(interpreter.interpret(scope)).toBe(1);
});
