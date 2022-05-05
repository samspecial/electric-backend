const crypto = require("crypto");
const algorithm = "aes-256-cbc";

const initVector = crypto.randomBytes(16);

const message = crypto.randomInt(100000, 999999).toString();

const Securitykey = crypto.randomBytes(32);
exports.generateCode = async () => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(Securitykey), initVector);

  let encryptedData = cipher.update(message, "utf-8", "hex");

  encryptedData += cipher.final("hex");

  console.log("Encrypted message: " + encryptedData);
  return { message, encryptedData };
};

exports.decryptCode = async (encryptedData) => {
  const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
  // decipher.setEncoding("utf8")
  decipher.setAutoPadding(false);
  let decryptedData = decipher.update(encryptedData, "hex", "utf8");
  console.log("Data:", decryptedData);
  decryptedData += decipher.final("utf8");
  console.log(decryptedData);

  console.log("Decrypted message: " + decryptedData);
  return decryptedData;
};
