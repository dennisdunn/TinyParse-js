const { regex, trim, literal, optional, between, number, any, sequence } = require('../lib');



const sum = trim(regex(/[-+]/));
const pro = trim(regex(/[*\/]/));
const pow = trim(regex(/\^/));
const lparen = trim(literal('('));
const rparen = trim(literal(')'));
const num = trim(number);

let E;
let Ep;
let T;
let Tp;
let P;
let F;

E = sequence(T, Ep);
Ep = optional(sequence(sum, T, Ep));
T = sequence(P, Tp);
Tp = optional(sequence(pro, P, Tp));
P = any(sequence(F, pow, P), F);
F = any(sequence(lparen, E, rparen), num);

module.exports = {
    E,
    Ep,
    T,
    Tp,
    P,
    F,
    sum,
    pro,
    pow,
    lparen,
    rparen,
    num
}