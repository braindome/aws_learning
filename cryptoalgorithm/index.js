/*
 * Gör två endpoints den ena är /encrypt och den andra /decrypt. I /encrypt så skickar man in en
 * text som sedan krypteras på något egenpåhittat sätt (ex. Ceasar chiffer) och retunerar
 * den krypterade texten och /decrypt tar emot den krypterade texten och returnerar
 * den dekrypterade texten.
 *
 * Snyggast krypteringsalgoritm vinner!
 *
 */

const alphabet = "abcdefghijklmnopqrstuvwxyz";

function encryptMessage(message, shift) {
  const encryptedMessage = message.replace(/[a-zA-Z]/g, (char) => {
    const isUpperCase = char === char.toUpperCase();
    const charIndex = alphabet.indexOf(char.toLowerCase());
    if (charIndex !== -1) {
      const newIndex = (charIndex + shift) % alphabet.length;
      const encryptedChar = alphabet[newIndex];
      return isUpperCase ? encryptedChar.toUpperCase() : encryptedChar;
    }
    return char;
  });
  return encryptedMessage;
}

function decryptMessage(encryptedMessage, shift) {
  return encryptMessage(encryptedMessage, alphabet.length - shift);
}

function checkEncryptedMessageFormat(body) {
  const keys = Object.keys(body);
  if (body?.message && body?.shift) {
    return true;
  } else {
    return false;
  }
}

function sendResponse(code, response) {
  return {
    statusCode: code,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify(response),
  };
}

exports.handler = async (event) => {
  const { method, path } = event.requestContext.http;

  switch (method) {
    case "OPTIONS":
      return sendResponse(200, { message: "This was a preflight call" });

    case "POST":
      switch (path) {
        case "/encrypt":
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

        case "/decrypt":
          try {
            const body = JSON.parse(event.body);
            const { encryptedMessage, shift } = body;
            if (
              typeof encryptedMessage !== "string" ||
              typeof shift !== "number"
            ) {
              return sendResponse(400, { error: "Invalid input" });
            }
            const decryptedMessage = decryptMessage(encryptedMessage, shift);
            return sendResponse(200, { decryptedMessage });
          } catch (error) {
            return sendResponse(500, { error: "Internal server error" });
          }

        default:
          return sendResponse(404, { error: "Not Found" });
      }

    default:
      return sendResponse(404, { error: "Not Found" });
  }
};

// exports.handler = async (event) => {
//   const { method, path } = event.requestContext.http;

//   if (method === "OPTIONS") {
//     return sendResponse(200, { message: "This was a preflight call" });
//   }

//   if (method === "POST" && path === "/encrypt") {
//     try {
//       const body = JSON.parse(event.body);
//       const { message, shift } = body;
//       if (typeof message !== "string" || typeof shift !== "number") {
//         return {
//           statusCode: 400,
//           body: JSON.stringify({ error: "Invalid input" }),
//         };
//       }
//       const encryptedMessage = encryptMessage(message, shift);
//       return sendResponse(200, {encryptedMessage});
//     } catch (error) {
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ error: "Internal server error" }),
//       };
//     }
//   } else if (method === "POST" && path === "/decrypt") {
//     try {
//       const body = JSON.parse(event.body);
//       const { encryptedMessage, shift } = body;
//       if (typeof encryptedMessage !== "string" || typeof shift !== "number") {
//         return {
//           statusCode: 400,
//           body: JSON.stringify({ error: "Invalid input" }),
//         };
//       }
//       const decryptedMessage = decryptMessage(encryptedMessage, shift);
//       return sendResponse(200, {decryptedMessage});
//     } catch (error) {
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ error: "Internal server error" }),
//       };
//     }
//   } else {
//     return {
//       statusCode: 404,
//       body: JSON.stringify({ error: "Not Found" }),
//     };
//   }
// };
