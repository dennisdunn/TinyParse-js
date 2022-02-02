const { parse } = require('../src');

test('parse 1+1', () => {
    const r = parse('1+1');
    expect(r.result).toStrictEqual([1, '+', 1])
})

test('parse 2*2', () => {
    const r = parse('2*2');
    expect(r.result).toStrictEqual([2, '*', 2])
})

test('parse 2*2+1', () => {
    const r = parse('2*2+1');
    expect(r.result).toStrictEqual([2, '*', 2, '+', 1])
})

test('parse 2*(1+1)', () => {
    const r = parse('2*(1+1)');
    expect(r.result).toStrictEqual([2, '*', '(', 1, '+', 1, ')'])
})

test('parse 2*(1+1)', () => {
    const r = parse('2*(1+1)');
    expect(r.result).toStrictEqual([2, '*', '(', 1, '+', 1, ')'])
})