//const { sendResponse } = require("../../responses");

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

function sendResponse(code, response) {
    return {
      statusCode: code,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    };
  }

module.exports.handler = async (event, context) => {
  try {
    const ticketNumberInput = JSON.parse(event.body);

    if (!ticketNumberInput) {
      return sendResponse(400, { error: "Ticket number is missing" });
    }

    const ticket = await getTicketByNumber(ticketNumberInput.ticketNumber);

    if (!ticket || !ticket.eventId) {
      return sendResponse(404, {
        error: "Event ID is missing from the ticket",
      });
    }

    const event = await getEventById(ticket.eventId);

    if (event) {
      return sendResponse(200, { success: true, event });
    } else {
      return sendResponse(404, { error: "Event not found" });
    }
  } catch (error) {
    console.error("Error retrieving ticket or event:", error);
    return sendResponse(500, { error: "Internal server error" });
  }
};

async function getTicketByNumber(ticketNumber) {
  const params = {
    TableName: "ticket-db",
    Key: {
      ticketNumber: ticketNumber,
    },
  };
  const result = await db.get(params).promise();
  return result.Item;
}

async function getEventById(eventId) {
  const eventParams = {
    TableName: "event-db",
    Key: {
      eventId: eventId,
    },
  };

  try {
    const eventResult = await db.get(eventParams).promise();
    return eventResult.Item;
  } catch (error) {
    console.error("Error retrieving event:", error);
    return null;
  }
}

// module.exports.handler = async (event, context) => {
//   try {
//     const ticketNumberInput = JSON.parse(event.body);

//     if (!ticketNumberInput) {
//       return sendResponse(400, { error: "Ticket number is missing" });
//     }

//     const params = {
//       TableName: "ticket-db",
//       Key: {
//         ticketNumber: ticketNumberInput,
//       },
//     };

//     const result = await db.get(params).promise();

//     if (result.Item) {
//       const ticket = result.Item;

//       if (!ticket || !ticket.eventId) {
//         return sendResponse(404, {
//           error: "Event ID is missing from the ticket",
//         });
//       }

//       // Skapa params för att hämta eventet
//       const eventParams = {
//         TableName: "event-db", // Antag att detta är namnet på din event-tabell
//         Key: {
//           eventId: ticket.eventId, // Använd eventId från biljetten
//         },
//       };

//       // Försök hämta eventet
//       try {
//         const eventResult = await db.get(eventParams).promise();

//         // Kontrollera om eventet finns
//         if (eventResult.Item) {
//           // Returnera eventet om det finns
//           return sendResponse(200, { success: true, event: eventResult.Item });
//         } else {
//           // Skicka ett felmeddelande om eventet inte hittades
//           return sendResponse(404, { error: "Event not found" });
//         }
//       } catch (error) {
//         // Logga och hantera eventuella fel vid hämtning av eventet
//         console.error("Error retrieving event:", error);
//         return sendResponse(500, { error: "Internal server error" });
//       }

//       return sendResponse(200, { success: true, ticket: result.Item });
//     } else {
//       return sendResponse(404, { error: "Ticket not found" });
//     }
//   } catch (error) {
//     console.error("Error retrieving ticket:", error);
//     return sendResponse(500, { error: "Internal server error" });
//   }
// };
