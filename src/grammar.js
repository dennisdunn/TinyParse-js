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

const sop = ws(L.anyOfChar('+-'));

const pop = ws(L.anyOfChar('*/'));

const lpar = ws(L.str('('));

const rpar = ws(L.str(')'));

const number = ws(L.number);

function E(ctx) {
    return L.sequence(T, E1)(ctx)
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
    return L.any(L.sequence(lpar, E, rpar), number)(ctx)
}

function parse(input) {
    return E(L.context(input));
}

module.exports = {
    parse,
    tag
}