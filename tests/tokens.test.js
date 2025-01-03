const tokenizer = require('../core/tokenizer')

test('test_it_can_consume_correctly', () => {
    let tokens = tokenizer.parse('variable $= "string";');
    expect(tokens.consume()).toStrictEqual({ type: 'word', value: 'variable', from: 0, to: 7 });
    tokens.next();

    expect(tokens.consume()).toStrictEqual({ type: 'magic', value: '$=', from: 9, to: 10 });
    tokens.next();
    expect(tokens.consume()).toStrictEqual({ type: 'string', value: '"string"', from: 12, to: 19 });
    tokens.next();

    expect(tokens.consume()).toStrictEqual({ type: 'EOE', value: ';', from: 20, to: 20 });
});