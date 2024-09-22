const express = require('express');
const rootRouter = require('./root_router');
const userManagementRouter = require('./userManagement/index');

const router = express.Router();

// Mount base routers
router.use('/', rootRouter);
router.use('/userManagement', userManagementRouter); // /userManagement routes

module.exports = router;
