const crypto = require('crypto');

const hashAlgorithm = 'sha256';
const hashEncodingBase = 'base64';
const cipherAlgorithm = 'aes-256-ctr';
// console.log(crypto.randomBytes(20).toString('hex')); // key generator
let key = 'f8674ff5ab6d971df2abc627b90e60628be929ec';
key = crypto
  .createHash(hashAlgorithm)
  .update(String(key))
  .digest(hashEncodingBase)
  .substr(0, 32);

const encryption_decryption = {
  encrytion: (data) => {
    data = Buffer.from(data);
    const initializationVector = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      cipherAlgorithm,
      key,
      initializationVector
    );
    const result = Buffer.concat([
      initializationVector,
      cipher.update(data),
      cipher.final(),
    ]);
    return result;
  },
  decryption: (data) => {
    const initializationVector = data.slice(0, 16);
    data = data.slice(16);
    const decipher = crypto.createDecipheriv(
      cipherAlgorithm,
      key,
      initializationVector
    );
    const result = Buffer.concat([decipher.update(data), decipher.final()]);
    return result.toString();
  },
};

module.exports = encryption_decryption;
