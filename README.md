***Tiny Parse*** Combinator Library
===

### Definitions

- Parser
    - A function which takes a context object and returns an object representing the structure of the input string.
     - ```context => object```
- Parser Generator
    - A function that takes a string and returns a parser which parses all or part of that string.
    - ```string => parser```
- Parser Combinator
    - A function that takes one or more parsers and returns a parser.
    - ```(...parsers) => parser```

### Utility Functions
- context
    - Given an input string, returns a context to pass to a parser.

### Parser Generators

- anyOfChar
    - A parser which succeeds when the next character to be parsed is contained in the string argument.
    - ```anyOfChar("0123456789")```
- str
    - A parser which matches all of the string argument.
    - ```str("hello, world")```

### Parser Combinators

##### ***Essential Combinators***

- sequence
    - Returns a parser which matches all of the arguments  in order.
    - ```sequence(str("hello"), str(", "), str("world"))```
- many
    - Matches the argument 0 or more times. Always succeeds, potentially returning ```[]``` as a result.
    - ```many(anyOfChar("0123456789"))```
- choice 
    - Returns the first parser that succeeds.
    ```choice(anyOfChar("0123456789"), anyOfChar("abcdef"))```
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

### Parsers
- digit
    - ```anyOfChar('0123456789')```
- lower
    - ```anyOfChar('abcdefghijklmnopqrstuvwxyz')```
- upper
    - ```anyOfChar('ABCDEFGHIJKLMNOPQRSTUVWXYZ')```
- symbols
    - ```anyOfChar('~!@#$%^&*()_+-={}[]\\|<>,.?/"\'')```
- hexDigit
    - ```choice(anyOfChar('abcdefABCDEF'), digit)```
- alphanum
    - ```choice(lower, upper, digit)```
- whitespace
    - ```anyOfChar(' \t\n\r')```




```
npm --registry=https://npm.pkg.github.com install 
```