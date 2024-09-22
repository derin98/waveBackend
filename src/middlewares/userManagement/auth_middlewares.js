// middlewares/userManagement/auth_middlewares.js
const jwt = require("jsonwebtoken");
const { authConfigs: { JWT_SECRET } } = require("../../configs");
const { responseManagers: { errorResponseManager: { errorResponse } } } = require("../../managers");
const { userManagementModels: { userModel: { Users } } } = require("../../models");
const { emailMiddlewares: { isValidEmail }, contactNumberMiddlewares: { validatePhoneNumberBasedOnCountryCode, validateCountryCode }, fieldDataMiddlewares: { validateField } } = require("../common");

const { constants: { userManagementConstants: { userConstants: { userStatus } } } } = require("../../utils");

const signUpRequestValidation = async (req, res, next) => {

    const { firstName, lastName, email, password, contactNumber } = req.body;

    req.userCreateObject = {
        firstName,
        lastName,
        email,
        authentication: {
            password,
            isBlocked: false
        },
        contactNumber,
    };

    const fieldsToValidate = [
        { fieldPath: "req.userCreateObject.firstName", field: "firstName", value: req.userCreateObject.firstName, options: { type: "string", minLength: 1, maxLength: 50, required: true, checkSpaceAtFirstAndLast: true } },
        { fieldPath: "req.userCreateObject.lastName", field: "lastName", value: req.userCreateObject.lastName, options: { type: "string", minLength: 1, maxLength: 50, required: true, checkSpaceAtFirstAndLast: true } },
        { fieldPath: "req.userCreateObject.email", field: "email", value: req.userCreateObject.email,options: { required: true, checkLowerCase: true, customValidation: isValidEmail, checkSpaceAtFirstAndLast: true } },
        { fieldPath: "req.userCreateObject.authentication.password", field: "authentication.password", value: req.userCreateObject.authentication.password, options: { required: true, customValidation: verifyPasswordRequirements, checkSpaceAtFirstAndLast: true } },
        { fieldPath: "req.userCreateObject.contactNumber.primaryCountryCode", field: "contactNumber.primaryCountryCode", value: req.userCreateObject?.contactNumber?.primaryCountryCode, options: { required: true, checkSpaceAtFirstAndLast: true, customValidation: validateCountryCode } },
        { fieldPath: "req.userCreateObject.contactNumber.primaryPhoneNumber", field: "contactNumber.primaryPhoneNumber", value: req.userCreateObject?.contactNumber?.primaryPhoneNumber, options: { required: true, checkSpaceAtFirstAndLast: true, customValidation: validatePhoneNumberBasedOnCountryCode(req.body.contactNumber?.primaryPhoneNumber, req.userCreateObject?.contactNumber?.primaryCountryCode) } },
    ];

    for (let { fieldPath, field, options, value } of fieldsToValidate) {

        const validatedField = await validateField(Users, field, options, value);
        if (validatedField.error) {
            return errorResponse(res, validatedField.error.message, 400, validatedField.error.errorInfo);
        }
        else if (validatedField.value) {
            fieldPath = validatedField.value;
        }

    }

    next();
}





const authenticateBearerToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return errorResponse(
            res,
            "Unauthorized! No token provided!",
            401
        );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return errorResponse(
            res,
            "Unauthorized! No token provided!",
            401
        );
    }

    decodeToken(token)
        .then((decoded) => {
            req.userId = decoded.id;
            req.businessUnit = decoded.businessUnit;
            next();
        })
        .catch(() => {
            return errorResponse(
                res,
                "Unauthorized! Invalid token provided!",
                401
            );
        });
};

// Function to decode token and get user information
const decodeToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });
};


const verifyPasswordRequirements = (password) => {

    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
    }
    if (!/[a-z]/.test(password)) {
        throw new Error("Password must contain at least one lowercase letter.");
    }
    if (!/[A-Z]/.test(password)) {
        throw new Error("Password must contain at least one uppercase letter.");
    }
    if (!/[0-9]/.test(password)) {
        throw new Error("Password must contain at least one numeric digit.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        throw new Error("Password must contain at least one special character.");
    }

    return true;
};


module.exports = {
    signUpRequestValidation,
    authenticateBearerToken,
    verifyPasswordRequirements
};