if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

module.exports = {
    MONGO_DB_HOST: process.env.MONGO_DB_HOST,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    MONGO_DB_USERNAME: process.env.MONGO_DB_USERNAME,
    MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD,
    MONGO_DB_PORT: process.env.MONGO_DB_PORT,
    MONGO_DB_PROTOCOL: process.env.MONGO_DB_PROTOCOL,
    MONGO_DB_URL:
        process.env.MONGO_DB_PROTOCOL == "mongodb+srv"
            ? `${process.env.MONGO_DB_PROTOCOL}://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}`
            : `${process.env.MONGO_DB_PROTOCOL}://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`
};

