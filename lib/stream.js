class Stream {
    constructor(text) {
        this.text = text;
        this.position = 0;
    }

    peek(length = 1) {
        const text = this.text.substring(this.position, this.position + length);
        return text === '' ? null : text;
    }

    seek(position) {
        const current = this.position;
        this.position = position;
        return current;
    }

    read(length = 1) {
        const current = this.position;
        this.position += length;
        const text = this.text.substring(current, current + length);
        return text === '' ? null : text;
    }
}

module.exports = {
    Stream
}