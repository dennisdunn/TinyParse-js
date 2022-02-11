
***Tiny Parse*** Combinator Library
===

About
---
***Tiny Parse*** is a parser combinator library in Javascript to provide examples for a presentation at [Stir Trek 2022](https://stirtrek.com).

Installation
---
Option #1
```bash
npm --registry=https://npm.pkg.github.com install --save tiny-parse 
```

Option #2
```bash
echo @dennisdunn:registry=https://npm.pkg.github.com >> .npmrc
npm install --save tiny-parse
```

Stream
---
A stream consists of some text and a pointer into that text. If the ```length``` or
```position``` arguments result in an invalid text pointer then an ```OutOfBoundsError```
is thrown.

- peek(length=1)
    - Return some characters from the text without advancing the pointer.
- read(length=1)
    - Return some characters from the text and advance the pointer.
- seek(position)
    - Set the text pointer to the specified position.

Base Parsers
---
These parsers throw a ```SyntaxError``` if they fail to match.

- anyOfChar
    - A parser which succeeds when the next character to be parsed is contained in the string argument.
    - ```anyOfChar("0123456789")```
- str
    - A parser which matches all of the string argument.
    - ```str("hello, world")```

Parser Combinators
---

##### ***Essential Combinators***

- sequence
    - Returns a parser which matches all of the arguments  in order.
    - ```sequence(str("hello"), str(", "), str("world"))```
- many
    - Matches the argument 0 or more times. Always succeeds, potentially returning ```[]``` as a result.
    - ```many(anyOfChar("0123456789"))```
- choice 
    - Returns the first parser that succeeds.
    - ```choice(anyOfChar("0123456789"), anyOfChar("abcdef"))```
- optional
    - Matches the argument 0 or 1 time. Always succeeds,
    potentially returning ```null``` as a result.
    - ```optional(anyOfChar(" \t\r\n"))```
- map
    - Tries to match the first argument and if successful, applies the second argument to the result.
    - ```map(many(anyOfChar("0123456789")), parseFloat)```

##### ***Utility Combinators***

- flat
    - If the result is an array, flatten it to ```depth```.
    - ```flat(many(str("hello")), 1)```
- join
    - Concatenate all of the items in the results array.
    - ```join(sequence(digit, many(digit)))```

Parsers
---
- digit
    - ```anyOfChar("0123456789")```
- lower
    - ```anyOfChar("abcdefghijklmnopqrstuvwxyz")```
- upper
    - ```anyOfChar("ABCDEFGHIJKLMNOPQRSTUVWXYZ")```
- symbols
    - ```anyOfChar("'~!@#$%^&*()_+-={}[]\\|<>,.?/\"")```
- hexDigit
    - ```choice(anyOfChar("abcdefABCDEF"), digit)```
- alphanum
    - ```choice(lower, upper, digit)```
- whitespace
    - ```anyOfChar(" \t\r\n")```
