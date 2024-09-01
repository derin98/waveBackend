if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

module.exports = {
    PROTOCOL: process.env.PROTOCOL || "http",
    IP: process.env.IP,
    PORT: process.env.PORT,
    VERSION: process.env.VERSION,
    DESCRIPTION: process.env.DESCRIPTION,
};
