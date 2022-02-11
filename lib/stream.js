const { OutOfBoundsError } = require('./error');

class Stream {
    constructor(text) {
        this.text = text;
        this.position = 0;
    }

    peek(length = 1) {
        if (this.position < 0 || this.position + length > this.text.length) throw new OutOfBoundsError(this.position);

        return this.text.substring(this.position, this.position + length);
    }

    seek(position) {
        if (position < 0 || position > this.text.length) throw new OutOfBoundsError(this.position);

        this.position = position;
        return position;
    }

    read(length = 1) {
        const end = this.position + length;
        if (this.position < 0 || end > this.text.length) throw new OutOfBoundsError(this.position);

        const text = this.text.substring(this.position, end);
        this.seek(end);
        return text;
    }
}

module.exports = {
    Stream
}