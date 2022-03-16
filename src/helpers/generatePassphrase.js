const crypto = require("crypto");
const algorithm = "aes-256-cbc";

// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);

// protected data
const message = crypto.randomInt(100000, 999999).toString();

console.log(`Random 6 digit integer: ${message}`);

// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);
exports.generateCode = async () => {
  // the cipher function
  console.log(typeof message);
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

  // encrypt the message
  // input encoding
  // output encoding
  let encryptedData = cipher.update(message, "utf-8", "hex");

  encryptedData += cipher.final("hex");

  console.log("Encrypted message: " + encryptedData);
  return encryptedData;
};

exports.decryptCode = async (encryptedData) => {
  const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

  let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

  decryptedData += decipher.final("utf8");

  console.log("Decrypted message: " + decryptedData);
  return decryptedData;
};
