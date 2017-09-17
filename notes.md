# Compilers

## Overview

+ compilers v. interpreters
+ parsers

### Why study compilers

+ recommendation to make your own
+ compiler theory is extremely difficult, good practice for understanding recursion as well

### History of compilers

+ Ada Lovelace: http://blog.stephenwolfram.com/2015/12/untangling-the-tale-of-ada-lovelace/
+ Alan Turing
+ Grace Hopper created the first modern compiler
+ John Backus - first to define grammar, Fortran
+ Alfred Aho - professor at Columbia University, wrote the "Dragon Book"

## How compilers work

+ frontend and backend
+ lexical analysis
  * tokens are parsed in a token parsing table
    - list of valid keywords: if, else, class, function
    - list of valid identifiers (variables)
    - list of valid literals (what string and numbers look like)
  * grammars
    - production rules (everything on the left can product everything on the right)
      + left hand side must be a single symbol (called non-terminals)
      + most grammars can have many non-terminals
    - language creates is the set of all terminal strings that can be generated using the production rules of that grammar
      + if you can generate a parse tree, then it's in the language defined by the grammar
      + if a string of Javascript code (terminal string) can be parsed using the production rules of Javascript, that file is a valid Javascript file
  * mathematical expressions
    - recursion because of base cases
    - "yield" is made up of the values that get concatenated from parse tree from left to right
    - E = expression
    - T = term
    - F = factor
    - {A, B} => placeholders
    - in recursive descent, if there are multiple right sides for a given left-side, look at the 'next value' and choose the route that maters
+ parsing approaches
  * shift-reduce parsing
    - stack implementation
    - analogy: arrays to individual values
    - shift until we cna reduce everything on the stack to a reduced value
    - Eric Schmidt wrote a shift-reduce parser
  * recursive descent parsing
    - manual parser creation
    - usually with grammar defined as LL (1)
    - "LL" = left to right, left-most derivation
    - "1" = look one token ahead in the token array
    - caveats
      + production rules have to be defined a certain way
      + have to be able to determine which production rule ... ?
      + ?
+ compilers are getting popular to ensure compatibility wtih older browsers
  * babeljs.io
  * "streama"?

## grammar

E => T A
A => + T A
     - T A
     epsilon
T => F B
B => * F B
     / F B
     epsilon
F => ( E )
     - F
     NUMBER
where

E = Expression
T = Term
F = Factor
A = ExpressionRemainder // a placeholder created to remove the left-recursion
B = TermRemainder // same as above
