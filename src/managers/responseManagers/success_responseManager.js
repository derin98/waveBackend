
const defaultResult = {}

const defaultSuccessMessage = "Success"

const defaultStatus = 200


exports.successResponse = function (res, message = defaultSuccessMessage, status = defaultStatus, result = defaultResult) {
    return res.status(status).json({
        message,
        result,
    });
};