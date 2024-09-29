if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    HASH_SALT_ROUNDS: process.env.HASH_SALT_ROUNDS
};
