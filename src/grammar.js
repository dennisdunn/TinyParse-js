const L = require('../lib');

/**
    E -> T E1 .
    E1 -> sop T E1 | .
    T -> F T1 .
    T1 -> pop F T1 | .
    F -> lpar E rpar | number .
 */

function sop(ctx) {
    return L.anyOfChar('+-')(ctx);
}

function pop(ctx) {
    return L.anyOfChar('*/')(ctx);
}

function lpar(ctx) {
    return L.str('\(')(ctx);
}

function rpar(ctx) {
    return L.str('\)')(ctx);
}

function number(ctx) {
    return L.map(L.regex(/[+-]?\d+(\.\d+)?/g), parseFloat)(ctx)
}

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

module.exports = {
    sop,
    pop,
    lpar,
    rpar,
    number,
    E,
    E1,
    T,
    T1,
    F
}