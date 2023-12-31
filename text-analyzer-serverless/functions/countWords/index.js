const { sendResponse } = require("../../responses/index.js");
const { turnTextToArray } = require("../../utils/textToWordArray");
const { ReturnOptions } = require("../../utils/ReturnOptions");

// function countWords(text) {
//   var words = text.split(/\s+/);

//   words = words.filter(function (word) {
//     return word.length > 0;
//   });

//   return words.length;
// }

exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    const { text } = body;

    if (typeof text !== "string") {
      return sendResponse(400, { error: "Invalid input" });
    }

    const wordCount = turnTextToArray(text, ReturnOptions.LENGTH);

    return sendResponse(200, { wordCount });
  } catch (error) {
    return sendResponse(500, { error: "Internal server error" });
  }
};

