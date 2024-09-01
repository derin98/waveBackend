const { mongoDbConfigs } = require("../configs");
const mongoose = require("mongoose");

async function establistMongoDbConnection() {
    try {
        await mongoose.connect(mongoDbConfigs.MONGO_DB_URL, {
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}
const db = mongoose.connection;
// Function to get MongoDB connection status
function getMongoDBStatus() {
    switch (db.readyState) {
        case 0:
            return "Disconnected";
        case 1:
            return "Connected";
        case 2:
            return "Connecting";
        case 3:
            return "Disconnecting";
        default:
            return "Unknown";
    }
}


module.exports = {
    establistMongoDbConnection,
    getMongoDBStatus
};
