const ParserTypes = require("./parser.types");
const Tokens = require("./globals/tokens");
const { starts_with_letter, has_special_charactere } = require("./globals/utils");

const EOE = ';';
const EOF = '/0';
const EOL = '\n';
const WHITE_SPACE = ' ';
const PRIMITIVE = ['number', 'str'];
const OPERANDS = ['+', '-', '*', '/'];
const LOGICAL = ['&not', '&and', '&or'];
const MAGIC_WORDS = ['dec', '$=', 'if', 'else', '=>'];
const COMPARISIONS = ['&gt', '&lt', '&gte', '&lte', '&neq', '&eq'];

function parse(code) {
    code += ' /0';

    let tokens = [];
    let cursor = 0;

    while (cursor < code.length) {

        let word = '';
        let initialPos = cursor;

        if (code[cursor] === EOE) {
            tokens.push({
                type: ParserTypes.EOE,
                value: code[cursor],
                from: initialPos,
                to: initialPos
            });
            cursor++;
            continue;
        }

        if (code[cursor] === ParserTypes.ESP) {
            tokens.push({
                type: ParserTypes.SEPARATOR,
                value: code[cursor],
                from: initialPos,
                to: initialPos
            });
            cursor++;
            continue;
        }

        while (code[cursor] !== WHITE_SPACE && code[cursor] !== EOE && code[cursor] !== ParserTypes.ESP && code[cursor] !== EOL && code[cursor] !== '"' && word !== EOF) {
            word += code[cursor];
            cursor += 1;
        }

        let stringOpened = code[cursor] === '"';
        let stringClosed = false;
        while (stringOpened && !stringClosed && cursor < code.length) {
            word += code[cursor];
            cursor += 1;
            stringClosed = code[cursor] === '"';

            if (stringClosed) {
                word += code[cursor];
                cursor += 1;
            }
        }

        if (!word) {
            cursor += 1;
            continue;
        };

        let tokenPos = {
            from: initialPos,
            to: cursor - 1
        }

        if ([ParserTypes.CALLABLE, ParserTypes.DEFINITION_PARAMS, ParserTypes.METHOD].includes(word)) {
            tokens.push({
                type: ParserTypes.DEFINITION,
                value: word,
                ...tokenPos
            });
            continue;
        }

        if (LOGICAL.includes(word)) {
            tokens.push({
                type: ParserTypes.LOGICAL,
                value: word,
                ...tokenPos
            });
            continue;
        }

        if (COMPARISIONS.includes(word)) {
            tokens.push({
                type: ParserTypes.COMPARISION,
                value: word,
                ...tokenPos
            });
            continue;
        }

        if (MAGIC_WORDS.includes(word)) {
            tokens.push({
                type: ParserTypes.MAGIC,
                value: word,
                ...tokenPos
            });

            continue;
        }

        if (PRIMITIVE.includes(word)) {
            tokens.push({
                type: ParserTypes.PRIMITIVE,
                value: word,
                ...tokenPos
            });
            continue;
        }

        if (OPERANDS.includes(word)) {
            tokens.push({
                type: ParserTypes.OPERAND,
                value: word,
                ...tokenPos
            });

            continue;
        }

        if (!Number.isNaN(Number(word))) {
            tokens.push({
                type: ParserTypes.NUMBER,
                value: word,
                ...tokenPos
            });

            continue;
        }

        if (stringOpened && stringClosed) {
            tokens.push({
                type: ParserTypes.STRING,
                value: word,
                ...tokenPos
            });
            continue;
        }

        if (word === EOF) {
            tokens.push({
                type: ParserTypes.EOF,
                value: word,
                ...tokenPos
            });
            continue;
        }

        if ([ParserTypes.BLOCK_START, ParserTypes.BLOCK_END].includes(word)) {
            tokens.push({
                type: ParserTypes.BLOCK,
                value: word,
                ...tokenPos
            });

            continue;
        }

        if (starts_with_letter(word) && !has_special_charactere(word)) {
            tokens.push({
                type: ParserTypes.WORD,
                value: word,
                ...tokenPos
            });

            continue;
        }

        if (word === ParserTypes.IMPLIES) {
            tokens.push({
                type: ParserTypes.CONDITIONAL,
                value: word,
                ...tokenPos
            });

            continue;
        }

        throw new Error('TokenizerError: unexpected token ' + word);
    }

    let list = new Tokens();
    list.setTokens(tokens);
    return list;
}

module.exports = { parse };