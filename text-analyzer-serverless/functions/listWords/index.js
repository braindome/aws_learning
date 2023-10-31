const { sendResponse } = require("../../responses/index");

function listWords(text) {
  var words = text.split(/\s+/);

  words = words.filter(function (word) {
    return word.length > 0;
  });

  return words;
}

exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    const { text } = body;

    if (typeof text !== "string") {
      return sendResponse(400, { error: "Invalid input" });
    }

    const wordList = listWords(text);

    return sendResponse(200, { wordList });
  } catch (error) {
    console.error(error);
    return sendResponse(500, { error: "Internal server error" });
  }
};

//module.exports = { listWords };
