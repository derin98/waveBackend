// middlewares/userManagement/index.js
const userMiddlewares = require('./user_middlewares');
const authMiddlewares = require('./auth_middlewares');

module.exports = {
    userMiddlewares,
    authMiddlewares
};
