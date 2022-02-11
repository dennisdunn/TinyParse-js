const { str, anyOfChar, Stream, SyntaxError, OutOfBoundsError } = require('../lib');

test('parse a literal', () => {
    const p = str('hello');
    const r = p(new Stream('hello, world'));

    expect(r).toBe('hello');
})

test('parse a literal, stream is longer than the literal', () => {
    const p = str('hello');

    expect(() => p(new Stream('123456789'))).toThrow(SyntaxError);
})

test('parse a literal, stream is shorter than the literal', () => {
    const p = str('hello');

    expect(() => p(new Stream('he'))).toThrow(OutOfBoundsError);
})

test('parse a char from a set', () => {
    const p = anyOfChar('0123456789');
    const r = p(new Stream('123'));

    expect(r).toBe('1');
})

test('parse a char from a set (fail)', () => {
    const p = anyOfChar('0123456789');

    expect(() => p(new Stream('hello, world'))).toThrow(SyntaxError);
})