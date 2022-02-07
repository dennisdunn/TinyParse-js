const grammar = require('./grammar');
const ast = require('./ast');

module.exports = {
    ...grammar,
    ...ast
}