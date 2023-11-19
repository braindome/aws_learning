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

module.exports = { encryptMessage };
