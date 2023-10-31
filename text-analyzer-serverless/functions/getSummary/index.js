const { sendResponse } = require("../../responses/index");
const { turnTextToArray } = require("../../utils/textToWordArray");
const { ReturnOptions } = require("../../utils/ReturnOptions");

exports.handler = async (event, context) => {
    try {
        const body = JSON.parse(event.body);
        const { text } = body;
    
        if (typeof text !== "string") {
          return sendResponse(400, { error: "Invalid input" });
        }
    
        const wordList = turnTextToArray(text, ReturnOptions.ARRAY);
        const wordCount = turnTextToArray(text, ReturnOptions.LENGTH);
    
        return sendResponse(200, { wordList, wordCount });
      } catch (error) {
        console.error(error);
        return sendResponse(500, { error: "Internal server error" });
      }
};
