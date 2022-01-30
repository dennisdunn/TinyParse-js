const G = require('../src');
const { run } = require('../lib');

test('parse a number', () => {
    const r = run(G.num, "123");
    expect(r.result).toBe(123);
})

test('parse a number with whitespace', () => {
    const r = run(G.num, "123     ");
    expect(r.result).toBe(123);
})

test('parse a power', () => {
    const r = run(G.P, "3^2");
    console.log(r)
    expect(r.result).toStrictEqual([3, '^', 2]);
})
