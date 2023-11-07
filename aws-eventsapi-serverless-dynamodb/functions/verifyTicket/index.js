const { sendResponse } = require("../../responses");

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (lambdaEvent, context) => {
  const eventJson = JSON.parse(lambdaEvent.body);

  const params = {
    TableName: "ticket-db",
    Key: {
      id: eventJson.ticketId,
    },
    UpdateExpression: "set isActive = :a",
    ExpressionAttributeValues: {
      ":a": true,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const ticket = await db
      .get({
        TableName: "ticket-db",
        Key: {
          id: eventJson.id,
        },
      })
      .promise();

    if (!ticket.Item.isActive) {
      const result = await db.update(params).promise();
      return sendResponse(200, {
        success: true,
        event: result.Attributes,
      });
    } else {
        return sendResponse(500, {
            success: false,
            message: "Ticket has already been activated."
        })
    }
  } catch (error) {
    return sendResponse(500, {
        error: "Internal server error",
        details: error.message,
        stack: error.stack,
      });
    
  }
};
