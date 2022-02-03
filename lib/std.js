const { map, sequence, str, anyOfChar, join, many, choice, optional, is } = require('./lib');

const digit = anyOfChar('0123456789');
const lower = anyOfChar('abcdefghijklmnopqrstuvwxyz');
const upper = anyOfChar('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
const symbols = anyOfChar('~!@#$%^&*()_+-={}[]\\|<>,.?/"\'');

const hexDigit = choice(anyOfChar('abcdefABCDEF'), digit);
const alphanum = choice(lower, upper, digit);
const whitespace = anyOfChar(' \t\n\r');

const digitStr = sequence(digit, optional(many(digit)));
const decimalStr = sequence(str('.'), digitStr);

const number = map(join(sequence(digitStr, optional(decimalStr))), parseFloat);

module.exports = {
    symbols,
    number,
    alphanum,
    hexDigit,
    whitespace,
    digit
}