function generateExpression(scope, tokens, expressions) {
    let token = tokens.consume();

    if (token.value === ParserTypes.DECLARATION) {
        let declarations = generateDeclarationExp(tokens);
        expressions = [];
        return declarations;
    }

    if (token.type === ParserTypes.OPERAND) {
        tokens.next();
        expressions.push(token.value);
        let expression = generateMathExpression(tokens, expressions);
        expressions = [];
        return expression;
    }

    if (token.type === ParserTypes.COMPARISION) {
        tokens.next();
        expressions.push(token.value);
        let expression = generateComparisionExpression(tokens, expressions);
        expressions = [];
        return expression;
    }

    if (token.type === ParserTypes.WORD) {
        tokens.next();
        expressions.push(token.value);
        return expressions;
    }

    if (token.type === ParserTypes.NUMBER) {
        tokens.next();
        expressions.push(token.value);
        return expressions;
    }

    if (token.type === ParserTypes.STRING) {
        tokens.next();
        expressions.push(token.value);
        return expressions;
    }
}

function generateDeclarationExp(tokens, expression) {
    tokens.next();

    if (tokens.consume().type !== ParserTypes.PRIMITIVE) {
        throw new Error('GererateError: unexpected token: ' + tokens.consume().value + ' as primitive.');
    }
    let type = tokens.consume().value;

    tokens.next();
    if (tokens.consume().type !== ParserTypes.WORD) {
        throw new Error('GererateError: unexpected token: ' + tokens.consume().value + ' as variable name.');
    }

    let typo = tokens.consume().value;

    // while (tokens.consume().type !== ParserTypes.EOE) {
    // TODO: make more than one declaration per type separated by ESP
    // }

    tokens.next();
    if (tokens.consume().type !== ParserTypes.ESP) {
        throw new Error('GererateError: expected ; token after declaration');
    }

    return new Declaration(type, typo);
}

function generateAttribuition(tokens, expression) {
    tokens.next();
    let typo = expression.shift().value;

    while (tokens.consume().type !== ParserTypes.EOE) {

    }
}

function generateMathExpression(tokens, expression) {
    tokens.next();

    while (tokens.consume().type !== ParserTypes.EOE) {

    }
}

function generateComparisionExpression(tokens, expression) {

}