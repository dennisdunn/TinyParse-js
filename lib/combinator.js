const { SyntaxError } = require('.');

const sequence = (...parsers) => stream => {
    let values = [];
    for (p of parsers) {
        values.push(p(stream));
    }
    return values;
}

/** ordered choice */
const choice = (...parsers) => stream => {
    for (p of parsers) {
        try {
            return p(stream);
        } catch { }
    }
    throw new SyntaxError(stream.position, 'CHOICE: No parser succeeded.');
}

/** always succeeds, possibly with null */
const optional = parser => stream => {
    try {
        return parser(stream);
    } catch {
        return null;
    }
}

/** always succeeds, possibly with [] */
const many = parser => stream => {
    const values = [];
    while (true) {
        try {
            values.push(parser(stream));
        } catch {
            return values;
        }
    }
}

const map = (parser, fn) => stream => {
    return fn(parser(stream));
}

module.exports = {
    sequence,
    choice,
    optional,
    many,
    map
}