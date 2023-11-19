const { encryptMessage } = require("../../business/encryptMessage");
const { sendResponse } = require("../../responses/index");

exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    const { message, shift } = body;
    if (typeof message !== "string" || typeof shift !== "number") {
      return sendResponse(400, { error: "Invalid input" });
    }
    const encryptedMessage = encryptMessage(message, shift);
    return sendResponse(200, { encryptedMessage });
  } catch (error) {
    return sendResponse(500, { error: "Internal server error" });
  }
};
