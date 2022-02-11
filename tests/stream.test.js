const { Stream } = require('../lib');

test('peek a stream, length=1', () => {
    const stream = new Stream('hello, world');
    const pos = stream.position;

    expect(stream.peek()).toBe('h');
    expect(stream.position).toEqual(pos)
})

test('peek a stream, length=5', () => {
    const stream = new Stream('hello, world');
    const pos = stream.position;

    expect(stream.peek(5)).toBe('hello');
    expect(stream.position).toEqual(pos)
})

test('read a stream, length=5', () => {
    const stream = new Stream('hello, world');
    const pos = stream.position;

    expect(stream.read(5)).toBe('hello');
    expect(stream.position).toBe(pos + 5)
})

test('read the only character from the stream', () => {
    const stream = new Stream('a');

    expect(stream.read()).toBe('a');
})

test('read beyond the last character throws', () => {
    const stream = new Stream('a');
    stream.read();

    expect(() => stream.read()).toThrow();
})

test('seek past eot throws', () => {
    const stream = new Stream('a');

    expect(() => stream.seek(2)).toThrow();
})