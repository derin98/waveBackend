const express = require('express');
const userRouter = require('./user_router');
const authRouter = require('./auth_router');

const router = express.Router();

// Mount sub-routers for user management
router.use('/users', userRouter);       // /userManagement/users for user-related routes
router.use('/auth', authRouter);        // /userManagement/auth for authentication routes

module.exports = router;
