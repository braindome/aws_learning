const { sendResponse } = require("../../responses");

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (lambdaEvent, context) => {
  const eventJson = JSON.parse(lambdaEvent.body);

  try {
    const result = await db
      .get({
        TableName: "event-db",
        Key: {
          id: eventJson.id,
        },
      })
      .promise();
    return sendResponse(200, {
      success: true,
      event: result.Item,
    });
  } catch (error) {
    return sendResponse(500, {
      error: "Internal server error",
      details: error.message,
      stack: error.stack,
    });
  }
};
