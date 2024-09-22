const express = require('express');
const { serverConfigs } = require("./src/configs");
const { mongoDbUtils: { establistMongoDbConnection } } = require("./src/utils");
const router = require("./src/routes");

const app = express();

app.use(express.json());

app.use("/", router);

app.listen(serverConfigs.PORT, () => {
    console.log(`Backend server is running on ${serverConfigs.PROTOCOL}://${serverConfigs.IP}:${serverConfigs.PORT}`);
    establistMongoDbConnection();
});
