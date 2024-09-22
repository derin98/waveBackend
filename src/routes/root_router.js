const express = require('express');
const { mongoDbUtils: { getMongoDBStatus } } = require("../utils");
const { serverConfigs } = require("../configs");
const router = express.Router();

router.get('/', (req, res) => {
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

module.exports = router;
