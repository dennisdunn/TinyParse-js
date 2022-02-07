const L = require('../lib');
const { AST } = require('./ast');

const ws = parser => L.map(L.sequence(parser, L.optional(L.many(L.whitespace))), value => value[0]);

const between = (...parsers) => L.map(L.sequence(...parsers), value => value[Math.floor(value.length / 2)]);

const sop = ws(L.map(L.anyOfChar('+-'), AST.sop));

const pop = ws(L.map(L.anyOfChar('*/'), AST.pop));

const lpar = ws(L.map(L.str('('), AST.lparen));

const rpar = ws(L.map(L.str(')'), AST.rparen));

const number = ws(L.map(L.number, AST.number));

function E(ctx) {
    return L.map(L.sequence(T, E1), AST.handler)(ctx);
}

function E1(ctx) {
    return L.map(L.optional(L.sequence(sop, T, E1)), AST.p_handler)(ctx)
}

function T(ctx) {
    return L.map(L.sequence(F, T1), AST.handler)(ctx)
}

function T1(ctx) {
    return L.map(L.optional(L.sequence(pop, F, T1)), AST.p_handler)(ctx)
}

function F(ctx) {
    return L.choice(number, between(lpar, E, rpar))(ctx);
}

module.exports = {
    E
}