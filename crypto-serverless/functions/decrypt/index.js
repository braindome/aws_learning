const { decryptMessage } = require("../../business/decryptMessage");
const { sendResponse } = require("../../responses/index");

exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    const { encryptedMessage, shift } = body;
    if (typeof encryptedMessage !== "string" || typeof shift !== "number") {
      return sendResponse(400, { error: "Invalid input" });
    }
    const decryptedMessage = decryptMessage(encryptedMessage, shift);
    return sendResponse(200, { decryptedMessage });
  } catch (error) {
    return sendResponse(500, { error: "Internal server error" });
  }
};
