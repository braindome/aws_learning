const { sendResponse } = require("../../responses");

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

function generateTicketNumber() {
  const randomDigits = Math.floor(100000 + Math.random() * 900000); 
  const ticketNr = `T-${randomDigits}`;
  return ticketNr;
}

module.exports.handler = async (lambdaEvent, context) => {
  const ticket = JSON.parse(lambdaEvent.body);
  const timestamp = new Date().getTime();

  ticket.id = `${timestamp}`;
  ticket.ticketNumber = generateTicketNumber();
  ticket.isActive = false;
  ticket.eventId = ticket.eventId


  try {
    await db
      .put({
        TableName: "ticket-db",
        Item: ticket,
      })
      .promise();
    return sendResponse(200, {
      success: true, ticketNumber: ticket.ticketNumber
    });
  } catch (error) {
    return sendResponse(500, {
      success: false,
    });
  }
};
