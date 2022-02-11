
const error = require('./error');
const stdlib = require('./stdlib');
const stream = require('./stream');
const parsers = require('./parser');
const combinators = require('./combinator');

module.exports = {
    ...error,
    ...stdlib,
    ...stream,
    ...parsers,
    ...combinators
}