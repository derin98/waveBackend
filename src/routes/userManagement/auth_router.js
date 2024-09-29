const express = require('express');
const router = express.Router();
const { userManagementMiddlewares: { authMiddlewares: { signUpRequestValidation, hashPasswordAfterValidation } } } = require("../../middlewares")
const { userManagementControllers: { userControllers: { createUser_controller} } } = require("../../controllers");


router.post('/signUp', [signUpRequestValidation, hashPasswordAfterValidation], createUser_controller );

// Example route for user login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Replace with authentication logic
    res.send({
        message: "Login successful",
        token: "jwt_token_here" // Replace with actual JWT token generation
    });
});

// Example route for user logout
router.post('/logout', (req, res) => {
    // Replace with logout logic
    res.send({
        message: "Logout successful"
    });
});

// Example route for password reset
router.post('/reset-password', (req, res) => {
    const { email } = req.body;
    // Replace with password reset logic
    res.send({
        message: `Password reset link sent to ${email}`
    });
});



module.exports = router;
