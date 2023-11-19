const { encryptMessage } = require("../business/encryptMessage");

const alphabet = "abcdefghijklmnopqrstuvwxyz";

function decryptMessage(encryptedMessage, shift) {
  return encryptMessage(encryptedMessage, alphabet.length - shift);
}

module.exports = { decryptMessage };
