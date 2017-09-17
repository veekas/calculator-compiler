'use strict'

function Calculator(inputString) {
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

  // David's while loop

  // var tokens = [];
  // matched = true;

  // while (inputString.length > 0 && matched) {
  //   matched = false;
  //   tokenTypes.forEach(tokenRegEx => {
  //     var token = tokenRegEx[0];
  //     var regex = tokenRegEx[1];
  //     var result = regex.exec(inputString);
  //     if (result !== null) {
  //       matched = true;
  //       tokens.push({ name: keyToPush, value: valueToPush });
  //       inputString = inputString.slice(result[0].length);
  //     }
  //   })
  //   if (!matched) {
  //     throw new Error("error" + inputString);
  //   }
  // }
  // return tokens;




  return streamArray;

  // learndot answer

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

Calculator.prototype.peek = function () {
  return this.tokenStream[0];

  // David's answer

  // Calculator.prototype.peek = function () {
  //   return this.tokenStream[0] || null;
  // };
};

Calculator.prototype.get = function () {
  return this.tokenStream.shift();

  // David's answer

  // Calculator.prototype.get = function () {
  //   return this.tokenStream.shift();
  // };
};

function TreeNode(name, ...children) { // "..." rest operator takes the remaining parameters an put them in an array
  this.name = name;
  this.children = children;
};

Calculator.prototype.parseExpression = function () {
  var term = this.parseTerm();
  var a = this.parseA();
  // console.log(term);
  // console.log(a);
  return new TreeNode('Expression', term, a);
};

// to do the parseExpression in a test-driven way, write a test fucntion (e.g. testParseExpression) with prototype values parseA and parseTerm that just return strings; write a new instance of Calculator, and write the test spec for what we would expect when we return it

/*
  A => + Term A
  A => - Term A
  A => epsilon ("nothing")
*/

Calculator.prototype.parseA = function () {
  var nextToken = this.peek(); // why do this?
  if (nextToken && nextToken.name === 'ADD') {
    this.get(); // pulls plus sign off token stream
    return new TreeNode('A', '+', this.parseTerm(), this.parseA());
  } else if (nextToken && nextToken.name === 'SUB') {
    this.get();
    return new TreeNode('A', '-', this.parseTerm(), this.parseA());
  } else {
    return new TreeNode('A');
  }
};

Calculator.prototype.parseTerm = function () {
  var factor = this.parseFactor();
  var b = this.parseB();
  return new TreeNode('Term', factor, b)
};

Calculator.prototype.parseB = function () {
  var nextToken = this.peek();
  if (nextToken && nextToken.name === 'MUL') {
    this.get();
    return new TreeNode('B', '*', this.parseFactor(), this.parseB());
  } else if (nextToken && nextToken.name === 'DIV') {
    this.get();
    return new TreeNode('B', '/', this.parseFactor(), this.parseB());
  } else {
    return new TreeNode('B');
  }
};

Calculator.prototype.parseFactor = function () {
  var nextToken = this.peek();
  if (nextToken.name === 'NUMBER') {
    return new TreeNode('Factor', this.get().value);
  } else if (nextToken.name === 'LPAREN') {
    this.get();
  }
};

Calculator.prototype.parseB = function () {

};

var calc = new Calculator('3+4*5');
var tree = calc.parseExpression()
