function Calculator (inputString) {
    this.tokenStream = this.lexer(inputString);
}

Calculator.prototype.lexer = function (inputString) {

  // still need to add an error message if string/character is unparsable

  const tokenTypes = [
    ['NUMBER', /^\d+/],
    ['ADD', /^\+/],
    ['SUB', /^\-/],
    ['MUL', /^\*/],
    ['DIV', /^\//],
    ['LPAREN', /^\(/],
    ['RPAREN', /^\)/]
  ];

  // // inputString = "12+(2*3)+4";
  var streamArray = [];
  var valueToPush;
  var keyToPush;
  // var index = 0;
  var tempInput = inputString;

  // figure out how to change inputString and break out of while loop when inputString or tempString is empty;
  while (tempInput) {
    for (var i = 0; i < tokenTypes.length; i++) {
      if (tokenTypes[i][1].exec(tempInput) !== null) {
        // console.log("token type", tokenTypes[i][1]);
        // console.log("index", i);
        // console.log("if statement value", tokenTypes[i][1].exec(inputString));
        valueToPush = tokenTypes[i][1].exec(tempInput)[0];
        // console.log("value", valueToPush);
        keyToPush = tokenTypes[i][0];
        // console.log("key", keyToPush);
        streamArray.push({ name: keyToPush, value: valueToPush });
        // console.log("streamArray", streamArray);
        tempInput = tempInput.slice(valueToPush.length);
        // index = 0;
        break;
      }
    }
  }

  return streamArray;

  // real answer

//   Calculator.prototype.lexer = function(inputString) {
//   var tokenTypes = [
//     ["NUMBER",    /^\d+/ ],
//     ["ADD",       /^\+/  ],
//     ["SUB",       /^\-/  ],
//     ["MUL",       /^\*/  ],
//   ["DIV", /^\//],
//     ["LPAREN", /^\(/],
//     ["RPAREN", /^\)/]
//   ];

//   var tokens = [];
//   var matched = true;

//   while (inputString.length & gt; 0 & amp;&amp; matched) {
//     matched = false;

//     tokenTypes.forEach(tokenRegex =&gt; {
//       var token = tokenRegex[0];
//       var regex = tokenRegex[1];

//       var result = regex.exec(inputString);

//       if (result !== null) {
//         matched = true;
//         tokens.push({ name: token, value: result[0] });
//         inputString = inputString.slice(result[0].length)
//       }
//     })

//     if (!matched) {
//       throw new Error("Found unparseable token: " + inputString);
//     }

//   }

//   return tokens;
// };

};
