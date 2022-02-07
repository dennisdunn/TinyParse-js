const { E } = require('../src');
const { context } = require('../lib');

test('parse & eval "1"', () => {
    const ast = E(context('1'));
    const r = ast.result.eval();
    expect(r).toBe(1);
})

test('parse & eval "1+2"', () => {
    const ast = E(context('1+2'));
    const r = ast.result.eval();
    expect(r).toBe(3);
})

test('parse & eval "1+2*3"', () => {
    const ast = E(context('1+2*3'));
    const r = ast.result.eval();
    expect(r).toBe(7);
})

test('parse & eval "(1+2)*3"', () => {
    const ast = E(context('(1+2)*3'));
    const r = ast.result.eval();
    expect(r).toBe(9);
})