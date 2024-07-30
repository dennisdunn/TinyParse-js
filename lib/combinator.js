const { SyntaxError } = require('./error');

/** Apply the parsers to the stream and return the results as a list.
 * If a parser returns nulll, don't include it in the results.
 */
const sequence = (...parsers) => stream => {
    let values = [];
    for (p of parsers) {
        const result = p(stream);
        if (result) values.push(result);
    }
    return values;
}

/** ordered choice */
const choice = (...parsers) => stream => {
    const current = stream.position;
    for (p of parsers) {
        try {
            return p(stream);
        } catch {
            stream.seek(current);
        }
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

const between = (...parsers) => stream => {
    return sequence(...parsers)(stream)[Math.floor(parsers.length / 2)];
}

const map = (parser, fn) => stream => {
    return fn(parser(stream));
}

/** Parse thre stream but always return null. */
const ignore = (parser) => stream => {
    parser(stream);
    return null;
}

/** Apply the parser exactly n times. */
const exactly = (parser, n) => stream => {
    let values = [];
    for (i = 0; i < n; i++) {
        const result = parser(stream);
        if (result) values.push(result);
    }
    return values;
}

module.exports = {
    sequence,
    choice,
    optional,
    many,
    between,
    map,
    ignore,
    exactly
}