function Calculator (inputString) {
    this.tokenStream = this.lexer(inputString);
}

Calculator.prototype.lexer = function (inputString) {

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
  var index = 0;
  var tempInput = inputString;
  var empty = false;

  // figure out how to change inputString and break out of while loop when inputString or tempString is empty;
  while (tempInput) {
    for (var i = 0; i < tokenTypes.length; i++) {
      if (tokenTypes[index][1].exec(tempInput) !== null) {
        // console.log("token type", tokenTypes[i][1]);
        // console.log("index", index);
        // console.log("if statement value", tokenTypes[i][1].exec(inputString));
        valueToPush = tokenTypes[i][1].exec(tempInput)[0];
        // console.log("value", valueToPush);
        keyToPush = tokenTypes[i][0];
        // console.log("key", keyToPush);
        streamArray.push({ name: keyToPush, value: valueToPush });
        // console.log("streamArray", streamArray);
        tempInput = tempInput.slice(valueToPush.length);
        index = 0;
        break;
      } else {
        index++;
        // console.log('got into the else statement, index is now', index);
      }
    }
  }

  return streamArray;

};

    // let currentIndex = 0;
    // streamObj = [];
    // inputAsArray = tokenTypes.split('');
    // let matcher = function () {
    //   if (tokenTypes.test([currentIndex][1])) {

    //   }
    // };

    // while ((myArray = myRe.exec(str)) !== null) {
    //   var msg = 'Found ' + myArray[0] + '. ';
    //   msg += 'Next match starts at ' + myRe.lastIndex;
    //   console.log(msg);
    // }

    // let nextIndex = currentIndex + 1;
    // let tokenMatch = false;

    // tokenTypes.indexOf()

    // return inputString[currentIndex];

//   }

// };
