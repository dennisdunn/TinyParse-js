const { flat, join, symbols, number, alphanum, hexDigit, whitespace, digit,many, Stream } = require('../lib');

test('parse a number', () => {
    const p = number;
    const r = p(new Stream('123'));

    expect(r).toBe('123');
})

test('parse a number (negative sign)', () => {
    const r = number(new Stream('-123'));

    expect(r).toBe('-123');
})
test('parse a decimal', () => {
    const p = number;
    const r = p(new Stream('123.1'));

    expect(r).toBe('123.1');
})

test('parse a decimal (negative sign)', () => {
    const r = number(new Stream('-123.1'));

    expect(r).toBe('-123.1');
})

test('parse a hex number', () => {
    const p = join(many(hexDigit));
    const r = p(new Stream('af123b'));

    expect(r).toBe('af123b');
})

test('parse a word', () => {
    const p = join(many(alphanum));
    const r = p(new Stream('AF123b'));

    expect(r).toBe('AF123b');
})