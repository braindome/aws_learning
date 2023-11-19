const { sendResponse } = require("../../responses/index");

exports.handler = async (event, context) => {
  return sendResponse(200, { message: "This was a preflight call" });
};
