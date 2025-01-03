const tokenizer = require('../core/tokenizer');
const Tokens = require('../core/globals/tokens');

test('it_can_parse_variable_declaration_tokens', () => {
    let tokens = tokenizer.parse('dec str var_auto;');
    expect(tokens).toBeInstanceOf(Tokens);
    expect(tokens.consume()).toStrictEqual({ type: 'magic', value: 'dec', from: 0, to: 2 });
    tokens.next();
    
    expect(tokens.consume()).toStrictEqual({ type: 'primitive', value: 'str', from: 4, to: 6 });
    tokens.next();

    expect(tokens.consume()).toStrictEqual({ type: 'word', value: 'var_auto', from: 8, to: 15 });
    tokens.next();

    expect(tokens.consume()).toStrictEqual({ type: 'EOE', value: ';', from: 16, to: 16 });
    tokens.next();

    expect(tokens.consume()).toStrictEqual({ type: 'EOF', value: '/0', from: 18, to: 19 });
});

test('it_can_parse_atribuition_tokens', () => {
    let tokens = tokenizer.parse('variable $= 42');
    expect(tokens).toBeInstanceOf(Tokens);

    expect(tokens.consume()).toStrictEqual({ type: 'word', value: 'variable', from: 0, to: 7 });
    tokens.next();

    expect(tokens.consume()).toStrictEqual({ type: 'magic', value: '$=', from: 9, to: 10 });
    tokens.next();

    expect(tokens.consume()).toStrictEqual({ type: 'number', value: '42', from: 12, to: 13 });
    tokens.next();

    expect(tokens.consume()).toStrictEqual({ type: 'EOF', value: '/0', from: 15, to: 16 });
});

test('it_can_parse_string_tokens', () => {
    let tokens = tokenizer.parse('variable $= "string"');
    expect(tokens).toBeInstanceOf(Tokens);

    expect(tokens.consume()).toStrictEqual({ type: 'word', value: 'variable', from: 0, to: 7 });
    tokens.next();

    expect(tokens.consume()).toStrictEqual({ type: 'magic', value: '$=', from: 9, to: 10 })
    tokens.next();

    expect(tokens.consume()).toStrictEqual({ type: 'string', value: '"string"', from: 12, to: 19 })
    tokens.next();

    expect(tokens.consume()).toStrictEqual({ type: 'EOF', value: '/0', from: 21, to: 22 });
});

test('it_can_parse_operand_tokens', () => {
    let tokens = tokenizer.parse('5 + 5');
    expect(tokens).toBeInstanceOf(Tokens);

    expect(tokens.consume()).toStrictEqual({ type: 'number', value: '5', from: 0, to: 0 });
    tokens.next();

    expect(tokens.consume()).toStrictEqual({ type: 'operand', value: '+', from: 2, to: 2 });
    tokens.next();

    expect(tokens.consume()).toStrictEqual({ type: 'number', value: '5', from: 4, to: 4 });
    tokens.next();

    expect(tokens.consume()).toStrictEqual({ type: 'EOF', value: '/0', from: 6, to: 7 });
});
