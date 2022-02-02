const G = require('../src');
const { context } = require('../lib');

const run = (parser, text) => parser(context(text));

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