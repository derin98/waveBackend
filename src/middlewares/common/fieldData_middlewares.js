const validateField = async (Model, field, options, value) => {
    const { type, maxLength, minLength, minValue, maxValue, checkLowerCase,
        isDate, unique, required, alphanumeric, numeric, checkDuplicates, customValidation, checkSpaceAtFirstAndLast } = options;

    if (required && !value) {
        return {
            error: {
                message: `Failed! ${field} field is required`,
                errorInfo: null
            }
        };
    }

    if (value) {
        if (type && typeof value !== type && !Array.isArray(value)) {
            return {
                error: {
                    message: `Failed! ${field} must be a ${type}`,
                    errorInfo: null
                }
            };
        }

        if (checkLowerCase && typeof value === "string") {

            if (value !== value.toLowerCase()) {
                return {
                    error: {
                        message: `Failed! ${field} must be in lowercase`,
                        errorInfo: null
                    }
                };
            }

        }

        if (checkSpaceAtFirstAndLast && value.length > 0 && typeof value === "string") {

            if (value.charAt(value.length - 1) === " ") {
                return {
                    error: {
                        message: `Failed! ${field} should not have space at last`,
                        errorInfo: null
                    }
                };
            }

            if (value.charAt(0) === " ") {
                return {
                    error: {
                        message: `Failed! ${field} should not have space at first`,
                        errorInfo: null
                    }
                };
            }

        }

        if (maxLength && value.length > maxLength && !Array.isArray(value)) {
            return {
                error: {
                    message: `Failed! ${field} should not exceed ${maxLength} characters`,
                    errorInfo: null
                }
            };
        }
        else if (maxLength && value.length > maxLength && Array.isArray(value)) {
            return {
                error: {
                    message: `Failed! ${field} should not exceed ${maxLength} items`,
                    errorInfo: null
                }
            };
        }

        if (minLength && value.length < minLength && !Array.isArray(value)) {
            return {
                error: {
                    message: `Failed! ${field} should not be less than ${minLength} characters`,
                    errorInfo: null
                }
            };
        }
        else if (minLength && value.length < minLength && Array.isArray(value)) {
            return {
                error: {
                    message: `Failed! ${field} should not be less than ${minLength} items`,
                    errorInfo: null
                }
            };
        }

        if (isDate && isNaN(new Date(value).getTime())) {
            return {
                error: {
                    message: `Failed! ${field} must be a valid date`,
                    errorInfo: null
                }
            };
        }

        if (maxValue !== undefined && value > maxValue) {
            return {
                error: {
                    message: `Failed! ${field} must not be greater than ${maxValue}`,
                    errorInfo: null
                }
            };
        }

        if (minValue !== undefined && value < minValue) {
            return {
                error: {
                    message: `Failed! ${field} must not be less than ${minValue}`,
                    errorInfo: null
                }
            };
        }

        if (Array.isArray(value) && checkDuplicates) {
            const idSet = new Set();
            const duplicateIds = new Set();

            for (const id of value) {
                if (idSet.has(id)) {
                    duplicateIds.add(id);
                } else {
                    idSet.add(id);
                }
            }

            if (duplicateIds.size > 0) {
                return {
                    error: {
                        message: `Failed! Duplicate IDs found in ${field}`,
                        errorInfo: { duplicateIds: Array.from(duplicateIds) }
                    }
                };
            }
        }

        if (unique) {
            const exists = await Model.findOne({ [`${field}`]: value, isDeleted: false });
            if (exists) {
                return {
                    error: {
                        message: `Failed! ${field} already exists in the server`,
                        errorInfo: null
                    }
                };
            }
        }


        if (customValidation) {
            try {
                await customValidation(value);
            } catch (error) {
                return {
                    error: {
                        message: `Failed! Validation failed for ${field}`,
                        errorInfo: { message: error.message } 
                    }
                };
            }
        }


        if (alphanumeric && !/^[a-zA-Z0-9\s]*$/.test(value)) {
            return {
                error: {
                    message: `Failed! ${field} should contain only alphanumeric characters`,
                    errorInfo: null
                }
            };
        }

        if (numeric && !/^[0-9]*$/.test(value)) {
            return {
                error: {
                    message: `Failed! ${field} should contain only numeric characters`,
                    errorInfo: null
                }
            };
        }

        return { value: value }; // return value;
    }

    return null;
};

module.exports = { validateField };