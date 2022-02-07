const L = require('../lib');
const { AST_Node } = require('./ast');

const ws = parser => L.map(L.sequence(parser, L.optional(L.many(L.whitespace))), value => value[0]);

const between = (...parsers) => L.map(L.sequence(...parsers), value => value[Math.floor(value.length / 2)]);

const sop = ws(L.map(L.anyOfChar('+-'), AST_Node.sop));

const pop = ws(L.map(L.anyOfChar('*/'), AST_Node.pop));

const lpar = ws(L.map(L.str('('), AST_Node.lparen));

const rpar = ws(L.map(L.str(')'), AST_Node.rparen));

const number = ws(L.map(L.number, AST_Node.number));

function E(ctx) {
    return L.map(L.sequence(T, E1), AST_Node.prod_handler)(ctx);
}

function E1(ctx) {
    return L.map(L.optional(L.sequence(sop, T, E1)), AST_Node.prod_prime_handler)(ctx)
}

function T(ctx) {
    return L.map(L.sequence(F, T1), AST_Node.prod_handler)(ctx)
}

function T1(ctx) {
    return L.map(L.optional(L.sequence(pop, F, T1)), AST_Node.prod_prime_handler)(ctx)
}

function F(ctx) {
    return L.choice(number, between(lpar, E, rpar))(ctx);
}

module.exports = {
    E
}