const regex = re => ctx => {
    re.lastIndex = ctx.idx;
    const res = re.exec(ctx.text);
    if (res && res.index === ctx.idx) {
        ctx.idx += res[0].length;
        return ({ ...ctx, result: res[0] });
    }
    return ({ ...ctx, isError: true, error: `expected ${re} at positon ${ctx.idx}` });
}

const map = (parser, fn) => ctx => {
    const res = parser(ctx);
    return ({ ...ctx, result: fn(res.result) });
}

const str = text => ctx => {
    return ctx.text.startsWith(text, ctx.idx)
        ? ({ ...ctx, result: text, idx: ctx.idx + text.length })
        : ({ ...ctx, isError: true, error: `expected ${text} at positon ${ctx.idx}` });
}

const anyOfChar = text => {
    return regex(new RegExp(`[${text}]`, 'g'))
}

const sequence = (...parsers) => ctx => {
    let values = [];
    let next = ctx;
    for (p of parsers) {
        const res = p(next);
        if (res.isError) return res;
        if (res.result) {
            if (Array.isArray(res.result)) {
                values = values.concat(res.result);
            } else {
                values.push(res.result);
            }
        }
        next = res;
    }
    return ({ ...next, result: values });
}

const any = (...parsers) => ctx => {
    for (p of parsers) {
        const res = p(ctx);
        if (!res.isError) return res;
    }
    return ({ ...ctx, result: null, isError: true, error: 'no parser succeeded' });
}

const optional = parser => ctx => {
    const res = parser(ctx);
    return res.isError
        ? ({ ...ctx, isError: false, error: null, result: null })
        : res;
}

const many = parser => ctx => {
    const values = [];
    let next = ctx;
    while (true) {
        const res = parser(next);
        next = res;
        if (res.isError) break;
        values.push(res.result);
    }
    return ({ ...next, result: values });
}

const ignore = parser => ctx => {
    const res = optional(parser)(ctx);
    return ({ ...res, result: null })
}

module.exports = {
    regex,
    map,
    str,
    anyOfChar,
    sequence,
    any,
    optional,
    many,
    ignore
}