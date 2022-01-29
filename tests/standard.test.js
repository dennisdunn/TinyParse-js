const { run, string, number, trim, literal } = require('../lib');

test('parse strings', () => {
    const r = run(string, "hello");
    expect(r.result).toBe('hello')
})

test('parse numbers', () => {
    const r = run(number, "123");
    expect(r.result).toBe(123)
})

test('parse number with whitespace', () => {
    const r = run(trim(number), '123   ');
    expect(r.result).toBe(123)
})

test('parse a literal', () => {
    const r = run(literal('hello'), 'hello');
    expect(r.result).toBe('hello');
})
