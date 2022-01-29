const { regex, trim, literal, between, number, any, sequence } = require('../lib');

/**
<exp> ::= <exp> + <term> | <exp> - <term> | <term>
<term> ::= <term> * <power> | <term> / <power> | <power>
<power> ::= <factor> ^ <power> | <factor>
<factor> ::= ( <exp> ) | <number>
*/

/**
expOp = + | -
termOp = * | /
powerOp = ^
lParen = (
rParen = )

exp = exp expOp term | term
term = term termOp power | power
power = factor powerOp power | factor
factor = lParen exp rParen | number
*/

/**
exp = term expPr
expPr = expOp term expPr
term = power termPr
termPr = termOp power termPr
power = factor powerOp power | factor
factor = lParen exp rParen | num
*/

const expOp = trim(regex(/[-+]/));
const termOp = trim(regex(/[*\/]/));
const powerOp = trim(regex(/\^/));
const lParen = trim(literal('('));
const rParen = trim(literal(')'));

let exp;
let power;
let termPr;
let expPr;

const num = trim(number);
const factor = any(between(lParen, exp, rParen), num);
power = any(sequence(factor, powerOp, power), factor);
termPr = sequence(termOp, power, termPr);
const term = sequence(power, termPr);
expPr = sequence(expOp, term, expPr);
exp = sequence(term, expPr);

module.exports = {
    num,
    factor,
    power,
    termPr,
    term,
    expPr,
    exp
}