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

exports.handler = async (event) => {
  const { method, path } = event.requestContext.http;

  if (method === "POST" && path === "/encrypt") {
    try {
      const body = JSON.parse(event.body);
      const { message, shift } = body;
      if (typeof message !== "string" || typeof shift !== "number") {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Invalid input" }),
        };
      }
      const encryptedMessage = encryptMessage(message, shift);
      return {
        statusCode: 200,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ encryptedMessage }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Internal server error" }),
      };
    }
  } else if (method === "POST" && path === "/decrypt") {
    try {
      const body = JSON.parse(event.body);
      const { encryptedMessage, shift } = body;
      if (typeof encryptedMessage !== "string" || typeof shift !== "number") {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Invalid input" }),
        };
      }
      const decryptedMessage = decryptMessage(encryptedMessage, shift);
      return {
        statusCode: 200,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ decryptedMessage }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Internal server error" }),
      };
    }
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Not Found" }),
    };
  }
};
