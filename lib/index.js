
const error = require('./error');
const stream = require('./stream');
const stdlib = require('./stdlib');
const parsers = require('./parser');
const combinators = require('./combinator');

module.exports = {
    ...error,
    ...stdlib,
    ...stream,
    ...parsers,
    ...combinators
}