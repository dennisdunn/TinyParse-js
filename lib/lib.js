const str = text => stream => {
    if (stream.peek(text.length) === text)
        return stream.read(text.length);
    else
        throw new Error(`expected "${text}" at positon ${stream.position}`);
}

const anyOfChar = text => stream => {
    if (text.indexOf(stream.peek()) >= 0)
        return stream.read();
    else
        throw new Error(`expected one of "${text}" at positon ${stream.position}`);
}

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
    throw new Error('no parser succeeded');
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
    map,
    str,
    anyOfChar,
    sequence,
    choice,
    optional,
    many
}