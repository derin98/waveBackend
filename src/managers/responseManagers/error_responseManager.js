
const defaultErrorInfo = { }

const defaultErrorMessage = "Something went wrong! Please try again later."

const defaultStatus = 500



exports.errorResponse = function (res, message = defaultErrorMessage, status = defaultStatus, errorInfo = defaultErrorInfo) {
    return res.status(status).json({
        message,
        errorInfo,
    });
};
