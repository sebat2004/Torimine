const crypto = require("crypto");

function genPassword (password) {
    const salt = crypto.randomBytes(32).toString("hex");
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    return {
        salt,
        hash: genHash
    }
}

function validatePassword (password, hash, salt) {
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex"); 
    return hash === genHash;
}

module.exports = {
    genPassword,
    validatePassword
}