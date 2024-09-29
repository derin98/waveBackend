const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { securityConfigs : { HASH_SALT_ROUNDS } } = require("../configs/index");


const hashTextCompareSync = async (data, hash) => {
   try {
       return await bcrypt.compareSync(data, hash);
   } catch (error) {
       throw error;
   }
}

const hashText = async (text) => {
    try {
        const saltRounds = 10;
        return await bcrypt.hashSync(text, saltRounds);
    } catch (error) {
        throw error;
    }
}


const encryptCBC = (textToEncrypt, secretKey) => {
    try {
        const paddedKey = Buffer.from(secretKey.padEnd(32, "0"), "utf8");
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv("aes-256-cbc", paddedKey, iv);
        let encrypted = cipher.update(textToEncrypt, "utf8", "base64");
        encrypted += cipher.final("base64");
        const result = Buffer.concat([iv, Buffer.from(encrypted, "base64")]).toString("base64");

        return result;
    } catch (error) {
        return error.message;
    }
};

const decryptCBC = (encryptedText, secretKey) => {
    try {
        const paddedKey = Buffer.from(secretKey.padEnd(32, "0"), "utf8");
        const fullCipher = Buffer.from(encryptedText, "base64");
        const iv = fullCipher.slice(0, 16);
        const ciphertext = fullCipher.slice(16);
        const decipher = crypto.createDecipheriv("aes-256-cbc", paddedKey, iv);
        let decrypted = decipher.update(ciphertext, "base64", "utf8");
        decrypted += decipher.final("utf8");

        return decrypted;
    } catch (error) {
        return error.message;
    }
};



module.exports = {
    hashTextCompareSync,
    hashText,
    encryptCBC,
    decryptCBC
}