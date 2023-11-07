const { sendResponse } = require("../../responses");

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event, context) => {
  const { Items } = await db
    .scan({
      TableName: "event-db",
    })
    .promise();
  return sendResponse(200, {
    success: true,
    event: Items,
  });
};
