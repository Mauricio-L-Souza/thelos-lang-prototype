const Program = require("./program");

function starts_with_letter(str) {
    const charCode = str.charCodeAt(0);
    return (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);
}

function has_special_charactere(str) {
    for (const char of str) {
        let isUnderscore = char === '_';
        let isLetter = starts_with_letter(char);
        let isNumber = char >= 48 && char <= 57;

        if (!isUnderscore && !isLetter && !isNumber) return true;
    }

    return false;
}

/**
 * 
 * @param {Program} program
*/
function prepare_value(program, value) {
    if (value.charAt(0) === "\"") {
        return JSON.parse(value);
    } else if (!Number.isNaN(Number(value))) {
        return Number(value);
    } else if (program.recoverVariable(value)) {
        return prepare_value(program, program.recoverVariable(value));
    }
}

module.exports = {
    has_special_charactere,
    starts_with_letter,
    prepare_value
};