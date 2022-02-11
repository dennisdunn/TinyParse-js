
const { str, anyOfChar, sequence, choice, optional, many, Stream, number, join } = require('../lib');

test('parse a sequence', () => {
    const p = sequence(str('hello'), str(', '), str('world'));
    const r = p(new Stream('hello, world'));

    expect(r).toStrictEqual(['hello', ', ', 'world']);
})

test('parse a sequence (fail)', () => {
    const p = sequence(str('hello'), str('world'));

    expect(() => p(new Stream('hello, world'))).toThrow();
})

test('parse a choice', () => {
    const p = choice(str('hello'), str(', '), str('world'));
    const r = p(new Stream('hello, world'));

    expect(r).toBe('hello');
})

test('parse an optional', () => {
    const p = optional(str('hello'));
    const r = p(new Stream('hello, world'));

    expect(r).toBe('hello');
})

test('parse an optional', () => {
    const p = optional(str('world'));
    const r = p(new Stream('hello, world'));

    expect(r).toBeNull();
})

test('parse many', () => {
    const p = many(str('world'));
    const r = p(new Stream('worldworld'));

    expect(r).toStrictEqual(['world', 'world']);
})

test('parse many as a string', () => {
    const p = join(many(str('world')));
    const r = p(new Stream('worldworld'));

    expect(r).toBe('worldworld');
})

test('parse many digits', () => {
    const r = many(anyOfChar('0123456789'))(new Stream('123'));

    expect(r).toStrictEqual(['1', '2', '3'])
})

test('parse a float', () => {
    const r = number(new Stream('123.123'));

    expect(r).toBe('123.123');
})
