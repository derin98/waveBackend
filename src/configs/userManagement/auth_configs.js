module.exports = {
    PASSWORD_EXPIRY_AT: Date.now() + (60 * 60 * 60 * 24 * 180 * 1000), // 180 days
    PASSWORD_ATTEMPTS: 5,
    OTP_ATTEMPTS: 5,
    OTP_EXPIRY_AT: Date.now() + (5 * 60 * 1000) // 5 minutes
};