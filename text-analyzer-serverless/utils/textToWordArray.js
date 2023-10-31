// const ReturnOptions = {
//     ARRAY: "array",
//     LENGTH: "length"
// }
const { ReturnOptions } = require("../utils/ReturnOptions");

function turnTextToArray(text, returnOption = ReturnOptions.ARRAY) {
  var words = text.split(/\s+/);

  words = words.filter(function (word) {
    return word.length > 0;
  });

  console.log(words);
  if (returnOption === ReturnOptions.ARRAY) {
    return words;
  } else if (returnOption === ReturnOptions.LENGTH) {
    return words.length
  } else if (returnOption === ReturnOptions.BOTH) {
    return { array: words, length: words.length }
  }
}

module.exports = { turnTextToArray };
