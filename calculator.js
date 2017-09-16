class Calculator {
  constructor(inputString) {
    this.lexer(inputString) = this.tokenStream;
  }

  lexer: function (inputString) {

    const tokenTypes = [
      ["NUMBER", /^\d+/],
      ["ADD", /^\+/],
      ["SUB", /^\-/],
      ["MUL", /^\*/],
      ["DIV", /^\//],
      ["LPAREN", /^\(/],
      ["RPAREN", /^\)/]
    ];

  }

};
