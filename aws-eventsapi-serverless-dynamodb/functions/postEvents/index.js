const { sendResponse } = require("../../responses");

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (lambdaEvent, context) => {
  const event = JSON.parse(lambdaEvent.body);

  const timestamp = new Date().getTime();

  event.id = `${timestamp}`;

  try {
    await db
      .put({
        TableName: "event-db",
        Item: event,
      })
      .promise();

    return sendResponse(200, { success: true });
  } catch (error) {
    return sendResponse(500, { success: false });
  }
};
