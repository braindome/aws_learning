const { sendResponse } = require("../../responses");

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (lambdaEvent, context) => {
  // 1. Parse ticket number from input and vaidates it

  const ticketNumberInput = JSON.parse(lambdaEvent.body);

  if (!ticketNumberInput) {
    return sendResponse(400, { error: "Ticket number is missing" });
  }

  if (typeof ticketNumberInput.ticketId !== "string") {
    return sendResponse(400, { error: "Invalid input type" });
  }


  try {
    const result = await db
      .get({
        TableName: "ticket-db",
        Key: {
          id: ticketNumberInput.ticketId,
        },
      })
      .promise();

    const resultEvent = await db
      .get({
        TableName: "event-db",
        Key: {
          id: result.Item.eventId,
        },
      })
      .promise();

    return sendResponse(200, {
      success: true,
      ticket: result.Item,
      event: resultEvent.Item,
    });
  } catch (error) {
    return sendResponse(500, {
      error: "Internal server errorrrrr",
      details: error.message,
      stack: error.stack,
    });
  }
};

