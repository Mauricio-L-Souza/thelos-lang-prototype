const Scope = require("./globals/scope");
const Tokens = require("./globals/tokens");
const If = require("./expressions/if.exp");
const ParserTypes = require('./parser.types');
const Math = require("./expressions/math.exp");
const Call = require("./expressions/call.exp");
const Definition = require("./expressions/definition.exp");
const Declaration = require("./expressions/declaration.exp");
const Attribuition = require("./expressions/attribuition.exp");
const Comparision = require("./expressions/comparision.exp");
const Block = require("./expressions/block.exp");

/**
 * 
 * @param {{ type: string, value: string }} token
 * @param {Tokens} tokens 
 * @param {Object} sentence
 */
function buildStatement(token, tokens, sentence) {

    if (token.type === ParserTypes.WORD) {
        tokens.next();
        sentence.push(token.value);
        return buildStatement(tokens.consume(), tokens, sentence);
    }

    if (token.type === ParserTypes.NUMBER) {
        tokens.next();
        sentence.push(token.value);
        return buildStatement(tokens.consume(), tokens, sentence);
    }

    if (token.type === ParserTypes.STRING) {
        tokens.next();
        sentence.push(token.value);
        return buildStatement(tokens.consume(), tokens, sentence);
    }

    if (token.value === ParserTypes.BLOCK_START) {
        tokens.next();
        let block = [];

        while (tokens.consume().value !== ParserTypes.BLOCK_END) {
            block.push(buildStatement(tokens.consume(), tokens, []));
        }

        tokens.next();

        return new Block(block);
    }

    if (token.type === ParserTypes.OPERAND) {
        tokens.next();
        sentence.push(token.value);
        sentence = buildStatement(tokens.consume(), tokens, sentence);

        return new Math(sentence.shift(), sentence.shift(), sentence.shift());
    }

    if (token.type === ParserTypes.COMPARISION) {
        tokens.next();
        sentence.push(token.value);
        sentence = buildStatement(tokens.consume(), tokens, sentence);

        return new Comparision(sentence.shift(), sentence.shift(), sentence.shift());
    }

    if (token.type === ParserTypes.PRIMITIVE) {
        tokens.next();
        sentence.push(token.value);
        return buildStatement(tokens.consume(), tokens, sentence);
    }

    if (token.value === ParserTypes.DECLARATION) {
        tokens.next();

        sentence = buildStatement(tokens.consume(), tokens, sentence);

        return new Declaration(sentence.shift(), sentence.shift());
    }

    if (token.value === ParserTypes.ATTRIBUITION) {
        tokens.next();
        const typo = sentence.shift();

        sentence = buildStatement(tokens.consume(), tokens, sentence);
        if (Array.isArray(sentence)) {
            sentence = sentence.shift();
        }
        return new Attribuition(sentence, typo);
    }

    if (token.value === ParserTypes.CALL) {
        tokens.next();

        let args = [];
        let typo = sentence.shift();

        if (tokens.consume().value !== ParserTypes.IMPLIES) {
            args = buildStatement(tokens.consume(), tokens, []);
        } else {
            tokens.next();
        }

        while (tokens.consume().value === ParserTypes.ESP) {
            tokens.next();
            args = buildStatement(tokens.consume(), tokens, args);
        }

        return new Call(typo, args);
    }

    if (token.value === ParserTypes.IF) {
        tokens.next();
        let condition = buildStatement(tokens.consume(), tokens, []);
        let implies = buildStatement(tokens.consume(), tokens, []);
        let otherwise = null;

        if (tokens.last().value === ParserTypes.ELSE) {
            if (tokens.consume().value !== ParserTypes.IMPLIES) {
                throw new Error('GenerationError: expected -> (implies) token after else');
            }

            tokens.next();

            otherwise = buildStatement(tokens.consume(), tokens, []);
        }

        return new If(condition, implies, otherwise);
    }

    if (token.value === ParserTypes.METHOD) {
        tokens.next();
        let typo = buildStatement(tokens.consume(), tokens, []).shift();
        let args = [];

        if (tokens.consume().value !== ParserTypes.IMPLIES) {
            args.push(buildStatement(tokens.consume(), tokens, []));
        } else {
            tokens.next();
        }

        while (tokens.consume().value === ParserTypes.ESP) {
            tokens.next();
            args.push(buildStatement(tokens.consume(), tokens, []));
        }

        let body = buildStatement(tokens.consume(), tokens, []);

        return new Definition(typo, args, body);
    }

    if (token.value === ParserTypes.IMPLIES) {
        tokens.next();
        return sentence;
    }

    if (sentence.length && token.value === ParserTypes.ELSE) {
        tokens.next();
        return sentence;
    }

    if (token.value === ParserTypes.ELSE) {
        tokens.next();
        return buildStatement(tokens.consume(), tokens, sentence);
    }

    if (token.value === ParserTypes.DEFINITION_PARAMS) {
        tokens.next();
        return sentence;
    }

    if (token.value === ParserTypes.ESP) {
        return sentence;
    }

    if (token.value === ParserTypes.BLOCK_END) {
        tokens.next();
        return sentence;
    }

    if (token.type === ParserTypes.EOE) {
        tokens.next();
        return sentence;
    }

    console.log({ token });

    throw new Error('GenerateError: missing EOE token');
}

/**
 * 
 * @param {Tokens} tokens 
 * @param {Scope} scope
 */
function generate(tokens, scope) {
    while (tokens.consume() && tokens.consume().type !== ParserTypes.EOF) {
        scope.statements.push(buildStatement(tokens.consume(), tokens, []));
    }

    return scope;
}

module.exports = { generate };