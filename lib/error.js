class SyntaxError extends Error {
    constructor(position, msg = '') {
        super(`Syntax error at position ${position}. ${msg}`);
    }
}

class StreamError extends Error {
    constructor(position, msg = '') {
        super(`Stream error at position ${position}. ${msg}`);
    }
}

class OutOfBoundsError extends StreamError {
    constructor(position) {
        super(position, `Stream out-of-bounds error.`);
    }
}

module.exports = {
    SyntaxError,
    StreamError,
    OutOfBoundsError
}