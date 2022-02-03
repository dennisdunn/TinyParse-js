const L = require('../lib');

const tag = text => value => ({ tag: text.toUpperCase(), value })

const ws = parser => L.sequence(parser, L.ignore(L.optional(L.whitespace)));

/**
    E -> T E1 .
    E1 -> sop T E1 | .
    T -> F T1 .
    T1 -> pop F T1 | .
    F -> lpar E rpar | number .
 */

const sop = ws(L.map(L.anyOfChar('+-'), tag('sop')));

const pop = ws(L.map(L.anyOfChar('*/'),tag('pop')));

const lpar = ws(L.map(L.str('('), tag('lparen')));

const rpar = ws(L.map(L.str(')'), tag('rparen')));

const number = ws(L.map(L.number, tag('number')));

function E(ctx) {
    return L.flat(L.sequence(T, E1))(ctx)
}

function E1(ctx) {
    return L.optional(L.sequence(sop, T, E1))(ctx)
}

function T(ctx) {
    return L.sequence(F, T1)(ctx)
}

function T1(ctx) {
    return L.optional(L.sequence(pop, F, T1))(ctx)
}

function F(ctx) {
    return L.choice(number, L.sequence(lpar, E, rpar))(ctx)
}

function parse(input) {
    return E(L.context(input));
}

module.exports = {
    parse,
    tag
}