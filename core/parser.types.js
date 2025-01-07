class ParserTypes {
    static EOE = 'EOE';
    static ESP = ',';
    static EOF = 'EOF';
    static CALL = "=>";
    static WORD = 'word'
    static MAGIC = 'magic';
    static OPERAND = 'operand';
    static ATTRIBUITION = '$=';
    static DECLARATION = 'dec';
    static LOGICAL = 'logical';
    static PRIMITIVE = 'primitive';
    static SEPARATOR = 'separator';
    static COMPARISION = 'comparision';

    // DEFINITION
    static METHOD = 'method';
    static CALLABLE = 'callable';
    static DEFINITION_PARAMS = ':>';
    static DEFINITION = 'definition';

    // CONDITIONALS
    static IF = 'if';
    static ELSE = 'else';
    static IMPLIES = '->';
    static CONDITIONAL = 'conditional';

    // PRIMITIVES
    static NUMBER = 'number';
    static STRING = 'string';

    // COMPARISIONS
    static EQUAL = '&eq';
    static NOT_EQUAL = '&neq';
    static LOWER_THAN = '&lt';
    static GREATER_THAN = '&gt';
    static LOWER_THAN_EQUAL = '&lte';
    static GREATER_THAN_EQUAL = '&gte';

    // Block
    static BLOCK = 'block';
    static BLOCK_END = 'end';
    static BLOCK_START = 'start';

}

module.exports = ParserTypes;