const G = require('../src');
const { context } = require('../lib');

const run = (parser, text) => parser(context(text));

test('parse a number', () => {
    const r = run(G.number, '123');
    expect(r.result).toBe(123);
})

test('parse F (number)', () => {
    const r = run(G.F, '123');
    expect(r.result).toBe(123);
})

test('parse F (parenthesized E)', () => {
    const r = run(G.F, '(123)');
    expect(r.result).toStrictEqual(['(', 123, ')'])
})

test('parse 1+1', () => {
    const r = run(G.E, '1+1');
    expect(r.result).toStrictEqual([1, '+', 1])
})

test('parse 2*2', () => {
    const r = run(G.E, '2*2');
    expect(r.result).toStrictEqual([2, '*', 2])
})

test('parse 2*2+1', () => {
    const r = run(G.E, '2*2+1');
    expect(r.result).toStrictEqual([2, '*', 2, '+', 1])
})

test('parse 2*(1+1)', () => {
    const r = run(G.E, '2*(1+1)');
    expect(r.result).toStrictEqual([2, '*', '(', 1, '+', 1, ')'])
})

test('parse 2*(1+1)', () => {
    const r = G.parse('2*(1+1)');
    expect(r.result).toStrictEqual([2, '*', '(', 1, '+', 1, ')'])
})