
const P = require('../lib');

test('parse an integer', () => {
    const r = P.number(P.context('123'));

    expect(r.isError).toBeFalsy();
    expect(r.result).toBe(123);
})

test('parse a float', () => {
    const r = P.number(P.context('123.123'));

    expect(r.isError).toBeFalsy();
    expect(r.result).toBe(123.123);
})

test('parse a float sans digits', () => {
    const r = P.number(P.context('.'));

    expect(r.isError).toBeTruthy();
})

test('parse a literal', () => {
    const p = P.str('hello');
    const r = p(P.context('hello, world'));

    expect(r.isError).toBeFalsy();
    expect(r.result).toBe('hello');
})

test('parse a char from a set', () => {
    const p = P.anyOfChar('efghij');
    const r = p(P.context('hello, world'));

    expect(r.isError).toBeFalsy();
    expect(r.result).toBe('h');
})

test('parse a sequence', () => {
    const p = P.sequence(P.str('hello'), P.str(', '), P.str('world'));
    const r = p(P.context('hello, world'));

    expect(r.isError).toBeFalsy();
    expect(r.result).toStrictEqual(['hello', ', ', 'world']);
})

test('parse a sequence (fail)', () => {
    const p = P.sequence(P.str('hello'), P.str('world'));
    const r = p(P.context('hello, world'));

    expect(r.isError).toBeTruthy();
})

test('parse a choice', () => {
    const p = P.choice(P.str('hello'), P.str(', '), P.str('world'));
    const r = p(P.context('hello, world'));

    expect(r.isError).toBeFalsy();
    expect(r.result).toBe('hello');
})

test('parse an optional', () => {
    const p = P.optional(P.str('hello'));
    const r = p(P.context('hello, world'));

    expect(r.isError).toBeFalsy();
    expect(r.result).toBe('hello');
})

test('parse an optional', () => {
    const p = P.optional(P.str('world'));
    const r = p(P.context('hello, world'));

    expect(r.isError).toBeFalsy();
    expect(r.result).toBeNull();
})

test('parse many', () => {
    const p = P.many(P.str('world'));
    const r = p(P.context('worldworld'));

    expect(r.isError).toBeFalsy();
    expect(r.result).toStrictEqual(['world', 'world']);
})

test('parse many as a string', () => {
    const p = P.join(P.many(P.str('world')), 1);
    const r = p(P.context('worldworld'));

    expect(r.isError).toBeFalsy();
    expect(r.result).toStrictEqual('worldworld');
})