
const P = require('../lib');

test('peek a stream, length=1', () => {
    const stream = new P.Stream('hello, world');
    const pos = stream.position;

    expect(stream.peek()).toBe('h');
    expect(stream.position).toEqual(pos)
})

test('peek a stream, length=5', () => {
    const stream = new P.Stream('hello, world');
    const pos = stream.position;

    expect(stream.peek(5)).toBe('hello');
    expect(stream.position).toEqual(pos)
})

test('read a stream, length=5', () => {
    const stream = new P.Stream('hello, world');
    const pos = stream.position;

    expect(stream.read(5)).toBe('hello');
    expect(stream.position).toEqual(pos + 5)
})

test('parse a literal', () => {
    const p = P.str('hello');
    const r = p(new P.Stream('hello, world'));

    expect(r).toBe('hello');
})

test('parse a literal (fail)', () => {
    const p = P.str('hello');

    expect(() => p(new P.Stream('123'))).toThrow();
})

test('parse a char from a set', () => {
    const p = P.anyOfChar('0123456789');
    const r = p(new P.Stream('123'));

    expect(r).toBe('1');
})

test('parse a char from a set (fail)', () => {
    const p = P.anyOfChar('0123456789');;

    expect(() => p(new P.Stream('hello, world'))).toThrow();
})

test('parse a sequence', () => {
    const p = P.sequence(P.str('hello'), P.str(', '), P.str('world'));
    const r = p(new P.Stream('hello, world'));

    expect(r).toStrictEqual(['hello', ', ', 'world']);
})

test('parse a sequence (fail)', () => {
    const p = P.sequence(P.str('hello'), P.str('world'));

    expect(() => p(new P.Stream('hello, world'))).toThrow();
})

test('parse a choice', () => {
    const p = P.choice(P.str('hello'), P.str(', '), P.str('world'));
    const r = p(new P.Stream('hello, world'));

    expect(r).toBe('hello');
})

test('parse an optional', () => {
    const p = P.optional(P.str('hello'));
    const r = p(new P.Stream('hello, world'));

    expect(r).toBe('hello');
})

test('parse an optional', () => {
    const p = P.optional(P.str('world'));
    const r = p(new P.Stream('hello, world'));

    expect(r).toBeNull();
})

test('parse many', () => {
    const p = P.many(P.str('world'));
    const r = p(new P.Stream('worldworld'));

    expect(r).toStrictEqual(['world', 'world']);
})

test('parse many as a string', () => {
    const p = P.join(P.many(P.str('world')));
    const r = p(new P.Stream('worldworld'));

    expect(r).toBe('worldworld');
})

test('parse many digits', () => {
    const r = P.many(P.anyOfChar('0123456789'))(new P.Stream('123'));

    expect(r).toStrictEqual(['1', '2', '3'])
})

test('parse a float', () => {
    const r = P.number(new P.Stream('123.123'));

    expect(r).toBe('123.123');
})
