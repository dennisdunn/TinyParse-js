const { map, regex } = require('./lib');

const symbols = regex(/[!@#$%^&*\(\)_+-={}\[\]|\\,\.<>\?\/\"\']+/g);
const number = map(regex(/[+-]?\d+(\.\d+)?/g), parseFloat);
const alphanumeric = regex(/[a-zA-Z0-9]+/g);
const hexDigits = regex(/[a-fA-F0-9]+/g);
const whitespace = regex(/\s+/g);
const digits = regex(/[0-9]+/g);

module.exports = {
    symbols,
    number,
    alphanumeric,
    hexDigits,
    whitespace,
    digits
}