const { E } = require('./grammar');
const { context } = require('../lib');

const parse = input => E(context(input));

const tag = tag => value => ({ tag, value })

module.exports = {
    parse,
    tag
}