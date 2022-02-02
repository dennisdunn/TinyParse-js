const L = require('../lib');

const tag = tag => value => ({ tag, value })

/**
    E -> T E1 .
    E1 -> sop T E1 | .
    T -> F T1 .
    T1 -> pop F T1 | .
    F -> lpar E rpar | number .
 */

const sop = L.anyOfChar('+-');

const pop = L.anyOfChar('*/');

const lpar = L.str('(');

const rpar = L.str(')');

const number = L.number;

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
    parse
}