const { sendResponse } = require("../../responses/index");
const { turnTextToArray } = require("../../utils/textToWordArray");
const { ReturnOptions } = require("../../utils/ReturnOptions");
const { listWordOccurrences } = require("../../utils/listWordOccurrences");

exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    const { text } = body;

    if (typeof text !== "string") {
      return sendResponse(400, { error: "Invalid input" });
    }

    const words = turnTextToArray(text, ReturnOptions.ARRAY);

    const stats = listWordOccurrences(words);

    return sendResponse(200, { stats });
  } catch (error) {
    return sendResponse(500, { error: "Internal server error" });
  }
};
