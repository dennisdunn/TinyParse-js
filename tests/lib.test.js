
const P = require('../lib');

test('create a regex parser', () => {
    const p = P.regex(/[0-9]+/g);
    const r = p(P.context('123'));
    expect(r.result).toBe('123');
})

test('parse a number', () => {
    const p = P.map(P.regex(/[0-9]+/g), parseFloat);
    const r = p(P.context('123'));
    expect(r.result).toBe(123);
})

test('parse a literal', () => {
    const p = P.str('hello');
    const r = p(P.context('hello, world'));
    expect(r.result).toBe('hello');
})

test('parse a char from a set', () => {
    const p = P.anyOfChar('a-z');
    const r = p(P.context('hello, world'));
    expect(r.result).toBe('h');
})

test('parse a sequence', () => {
    const p = P.sequence(P.str('hello'), P.str(', '), P.str('world'));
    const r = p(P.context('hello, world'));
    expect(r.result).toStrictEqual(['hello', ', ', 'world']);
})

test('parse a sequence (fail)', () => {
    const p = P.sequence(P.str('hello'), P.str('world'));
    const r = p(P.context('hello, world'));
    expect(r.isError).toBeTruthy();
})

test('parse a any', () => {
    const p = P.any(P.str('hello'), P.str(', '), P.str('world'));
    const r = p(P.context('hello, world'));
    expect(r.result).toBe('hello');
})

test('parse an optional', () => {
    const p = P.optional(P.str('hello'));
    const r = p(P.context('hello, world'));
    expect(r.result).toBe('hello');
})

test('parse an optional', () => {
    const p = P.optional(P.str('world'));
    const r = p(P.context('hello, world'));
    expect(r.result).toBeNull();
})

test('parse many', () => {
    const p = P.many(P.str('world'));
    const r = p(P.context('worldworld'));
    expect(r.result).toStrictEqual(['world', 'world']);
})