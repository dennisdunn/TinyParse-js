
***Tiny Parse*** Combinator Library
===

About
---
***Tiny Parse*** is a parser combinator library in Javascript to provide examples for a presentation at [Stir Trek 2022](https://stirtrek.com).

Installation
---
Option #1
```bash
npm --registry=https://npm.pkg.github.com install --save @dennisdunn/tiny-parse 
```

Option #2
```bash
echo @dennisdunn:registry=https://npm.pkg.github.com >> .npmrc
npm install --save @dennisdunn/tiny-parse
```

Utility Functions
---
- context
    - Given an input string, returns a context to pass to a parser.

Parser Generators
---

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
- between
    - Matches all of the arguments and returns the result of the middle parser.
    - ```between(open_bracket, expression, close_bracket)```
- map
    - Tries to match the first argument and if successful, applies the second argument to the result.
    - ```map(join(many(anyOfChar("0123456789"))), parseFloat)```

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
- number
    - ```sequence(digit, many(digit), optional(sequence(str("."), digit, many(digit)))```
