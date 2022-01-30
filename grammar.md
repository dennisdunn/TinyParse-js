Math Expression Grammar
===

Original Grammar
---
```
<exp> ::= <exp> + <term> | <exp> - <term> | <term>
<term> ::= <term> * <factor> | <term> / <factor> | <factor>
<factor> ::= ( <exp> ) | <number>
```

Change the Notation
---
```
E -> E + T | E - T | T.
T -> T * P | T / F | F.
F -> ( E ) | number.
```

Introduce Terminals for Literals
---
```
E -> E sop T |.
T -> T pop F | F.
F -> lpar E rpar | number.
```

Remove Direct Left Recursion
---
```
E -> T E1 .
E1 -> sop T E1 | .
T -> F T1 .
T1 -> pop F T1 | .
F -> lpar E rpar | number .
```
