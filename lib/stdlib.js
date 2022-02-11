const { map, sequence, many, choice, optional } = require('./combinator');
const { str, anyOfChar } = require('./parser');


/** flatten the results array */
const flat = (parser, depth = Infinity) => map(parser, value => Array.isArray(value) ? value.flat(depth) : value)

/** Join the results array into a single string. */
const join = (parser) => map(flat(parser), value => Array.isArray(value) ? value.join('') : value)

const digit = anyOfChar('0123456789');
const lower = anyOfChar('abcdefghijklmnopqrstuvwxyz');
const upper = anyOfChar('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
const symbols = anyOfChar('~!@#$%^&*()_+-={}[]\\|<>,.?/"\'');

const hexDigit = choice(anyOfChar('abcdefABCDEF'), digit);
const alphanum = choice(lower, upper, digit);
const whitespace = anyOfChar(' \t\n\r');

const digitStr = sequence(digit, optional(many(digit)));
const decimalStr = sequence(str('.'), digitStr);

const number = join(sequence(digitStr, optional(decimalStr)));

module.exports = {
    flat,
    join,
    symbols,
    number,
    alphanum,
    hexDigit,
    whitespace,
    digit
}