const { SyntaxError } = require('./error');

const str = text => stream => {
    if (stream.peek(text.length) === text)
        return stream.read(text.length);
    else
        throw new SyntaxError(stream.position, `Expected "${text}".`);
}

const anyOfChar = text => stream => {
    if (text.indexOf(stream.peek()) >= 0)
        return stream.read();
    else
        throw new SyntaxError(stream.position, `Expected one of "${text}".`);
}

module.exports = {
    str,
    anyOfChar
}