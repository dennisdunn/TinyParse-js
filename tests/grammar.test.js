const { parse } = require('../src');

test('parse 1', () => {
    const r = parse('1 ');
    expect(r.result).toStrictEqual([{ tag: 'NUMBER', value: 1 }])
})

test('parse 1+1', () => {
    const r = parse('1 + 1');
    expect(r.result).toStrictEqual([{ tag: 'NUMBER', value: 1 }, { tag: 'SOP', value: '+' }, { tag: 'NUMBER', value: 1 }])
})

test('parse 2*2', () => {
    const r = parse('2*2');
    expect(r.result).toStrictEqual([{ tag: 'NUMBER', value: 2 }, { tag: 'POP', value: '*' }, { tag: 'NUMBER', value: 2 }])
})

test('parse 2*2+1', () => {
    const r = parse('2 *2+ 1');
    expect(r.result).toStrictEqual([{ tag: 'NUMBER', value: 2 }, { tag: 'POP', value: '*' }, { tag: 'NUMBER', value: 2 }, { tag: 'SOP', value: '+' }, { tag: 'NUMBER', value: 1 }])
})

test('parse 2*(1+1)', () => {
    const r = parse('2*(1+1)');
    expect(r.result).toStrictEqual([{ tag: 'NUMBER', value: 2 },  { tag: 'POP', value: '*' },{ tag: 'LPAREN', value: '(' }, { tag: 'NUMBER', value: 1 }, { tag: 'SOP', value: '+' }, { tag: 'NUMBER', value: 1 }, { tag: 'RPAREN', value: ')' }])

})