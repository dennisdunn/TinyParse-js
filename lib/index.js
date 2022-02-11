const lib = require('./lib');
const std = require('./std');
const stream = require('./stream');

module.exports = {
    ...lib,
    ...std,
    ...stream
}