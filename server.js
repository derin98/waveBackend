const express = require('express');
const app = express();
const { serverConfigs } = require("./src/configs");
const { establistMongoDbConnection, getMongoDBStatus } = require("./src/utils/mongoDb_utils");
app.use(express.json());

//root api
app.get('/', (req, res) => {
    res.send({
        "message": "Server is up and running",
        "result": {
            "protocol": serverConfigs.PROTOCOL,
            "ip": serverConfigs.IP,
            "version": serverConfigs.VERSION,
            "description": serverConfigs.DESCRIPTION,
            "databaseStatus": getMongoDBStatus()
        }
    });
});

app.listen(serverConfigs.PORT, () => {
    console.log(`Backend server is running on ${serverConfigs.PROTOCOL}://${serverConfigs.IP}:${serverConfigs.PORT}`);
    establistMongoDbConnection();
});
