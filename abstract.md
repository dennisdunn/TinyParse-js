Level up Your Parsing
---

- I have a parsing problem.
- I'll use regular expressions!
- Now I have two problems...

Sometimes the text that you need to process
isn't parsable using regular expressions. What do you do then?

You could break out a parser generator like yacc or
ANTLR but then you have to learn how to use them. 
You could hand-craft a parser but that can be time
consuming.

There is a third option; parser combinators.
By composing parser functions we can use
simple parsers as building blocks to easily create
a parser for that obscure text format. Let's look at parser 
combinators; what they are, and how to use them.
