const map = (parser, fn) => ctx => {
    const res = parser(ctx);
    return ({ ...res, result: fn(res.result) });
}

const str = text => ctx => {
    return ctx.text.startsWith(text, ctx.idx)
        ? ({ ...ctx, result: text, idx: ctx.idx + text.length })
        : ({ ...ctx, isError: true, error: `expected "${text}" at positon ${ctx.idx}` });
}

const anyOfChar = text => ctx => {
    const c = ctx.text[ctx.idx];
    return text.indexOf(c) >= 0
        ? ({ ...ctx, result: c, idx: ctx.idx + 1 })
        : ({ ...ctx, isError: true, error: `expected one of "${text}" at positon ${ctx.idx}` });
}

const sequence = (...parsers) => ctx => {
    let values = [];
    let next = ctx;
    for (p of parsers) {
        next = p(next);
        if (next.isError) return next;
        if (next.result) {
            values.push(next.result);
        }
    }
    return ({ ...next, result: values });
}

/** ordered choice */
const choice = (...parsers) => ctx => {
    for (p of parsers) {
        const res = p(ctx);
        if (!res.isError) return res;
    }
    return ({ ...ctx, result: null, isError: true, error: 'no parser succeeded' });
}

/** always succeeds, possibly with null */
const optional = parser => ctx => {
    const res = parser(ctx);
    return res.isError
        ? ({ ...ctx, isError: false, error: null, result: null })
        : res;
}

/** always succeeds, possibly with [] */
const many = parser => ctx => {
    const values = [];
    let next = ctx;
    while (true) {
        next = parser(next);
        if (next.isError) break;
        values.push(next.result);
    }
    return ({ ...next, isError: false, error: null, result: values });
}

/** ignore the parser results but advance the index */
const ignore = parser => ctx => {
    const res = optional(parser)(ctx);
    return ({ ...res, result: null })
}

module.exports = {
    map,
    str,
    anyOfChar,
    sequence,
    choice,
    optional,
    many,
    ignore
}