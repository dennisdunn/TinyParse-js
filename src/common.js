const { E } = require('./grammar');
const { context } = require('../lib');

const parse = input => E(context(input));

module.exports = {
    parse
}