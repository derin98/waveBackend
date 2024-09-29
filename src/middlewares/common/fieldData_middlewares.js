// const validateField = async (Model, field, options, value) => {
//     const { type, maxLength, minLength, minValue, maxValue, checkLowerCase,
//         isDate, unique, required, alphanumeric, numeric, checkDuplicates, customValidation, checkSpaceAtFirstAndLast } = options;

//     if (required && !value) {
//         return {
//             error: {
//                 message: `Failed! ${field} field is required`,
//                 errorInfo: null
//             }
//         };
//     }

//     if (value) {
//         if (type && typeof value !== type && !Array.isArray(value)) {
//             return {
//                 error: {
//                     message: `Failed! ${field} must be a ${type}`,
//                     errorInfo: null
//                 }
//             };
//         }

//         if (checkLowerCase && typeof value === "string") {

//             if (value !== value.toLowerCase()) {
//                 return {
//                     error: {
//                         message: `Failed! ${field} must be in lowercase`,
//                         errorInfo: null
//                     }
//                 };
//             }

//         }

//         if (checkSpaceAtFirstAndLast && value.length > 0 && typeof value === "string") {

//             if (value.charAt(value.length - 1) === " ") {
//                 return {
//                     error: {
//                         message: `Failed! ${field} should not have space at last`,
//                         errorInfo: null
//                     }
//                 };
//             }

//             if (value.charAt(0) === " ") {
//                 return {
//                     error: {
//                         message: `Failed! ${field} should not have space at first`,
//                         errorInfo: null
//                     }
//                 };
//             }

//         }

//         if (maxLength && value.length > maxLength && !Array.isArray(value)) {
//             return {
//                 error: {
//                     message: `Failed! ${field} should not exceed ${maxLength} characters`,
//                     errorInfo: null
//                 }
//             };
//         }
//         else if (maxLength && value.length > maxLength && Array.isArray(value)) {
//             return {
//                 error: {
//                     message: `Failed! ${field} should not exceed ${maxLength} items`,
//                     errorInfo: null
//                 }
//             };
//         }

//         if (minLength && value.length < minLength && !Array.isArray(value)) {
//             return {
//                 error: {
//                     message: `Failed! ${field} should not be less than ${minLength} characters`,
//                     errorInfo: null
//                 }
//             };
//         }
//         else if (minLength && value.length < minLength && Array.isArray(value)) {
//             return {
//                 error: {
//                     message: `Failed! ${field} should not be less than ${minLength} items`,
//                     errorInfo: null
//                 }
//             };
//         }

//         if (isDate && isNaN(new Date(value).getTime())) {
//             return {
//                 error: {
//                     message: `Failed! ${field} must be a valid date`,
//                     errorInfo: null
//                 }
//             };
//         }

//         if (maxValue !== undefined && value > maxValue) {
//             return {
//                 error: {
//                     message: `Failed! ${field} must not be greater than ${maxValue}`,
//                     errorInfo: null
//                 }
//             };
//         }

//         if (minValue !== undefined && value < minValue) {
//             return {
//                 error: {
//                     message: `Failed! ${field} must not be less than ${minValue}`,
//                     errorInfo: null
//                 }
//             };
//         }

//         if (Array.isArray(value) && checkDuplicates) {
//             const idSet = new Set();
//             const duplicateIds = new Set();

//             for (const id of value) {
//                 if (idSet.has(id)) {
//                     duplicateIds.add(id);
//                 } else {
//                     idSet.add(id);
//                 }
//             }

//             if (duplicateIds.size > 0) {
//                 return {
//                     error: {
//                         message: `Failed! Duplicate IDs found in ${field}`,
//                         errorInfo: { duplicateIds: Array.from(duplicateIds) }
//                     }
//                 };
//             }
//         }

//         if (unique) {
//             const exists = await Model.findOne({ [`${field}`]: value, isDeleted: false });
//             if (exists) {
//                 return {
//                     error: {
//                         message: `Failed! ${field} already exists in the server`,
//                         errorInfo: null
//                     }
//                 };
//             }
//         }


//         if (customValidation) {
//             try {
//                 await customValidation(value);
//             } catch (error) {
//                 return {
//                     error: {
//                         message: `Failed! Validation failed for ${field}`,
//                         errorInfo: { message: error.message } 
//                     }
//                 };
//             }
//         }


//         if (alphanumeric && !/^[a-zA-Z0-9\s]*$/.test(value)) {
//             return {
//                 error: {
//                     message: `Failed! ${field} should contain only alphanumeric characters`,
//                     errorInfo: null
//                 }
//             };
//         }

//         if (numeric && !/^[0-9]*$/.test(value)) {
//             return {
//                 error: {
//                     message: `Failed! ${field} should contain only numeric characters`,
//                     errorInfo: null
//                 }
//             };
//         }

//         return { value: value }; // return value;
//     }

//     return null;
// };




// module.exports = { validateField };
























































// Validation Functions
const validateTextField = async (Model, field, options, value) => {
    const { required, maxLength, minLength, checkLowerCase, checkSpaceAtFirstAndLast, alphanumeric, unique, customValidation } = options;

    if (required && !value) {
        return createError(field, "required");
    }
    if (value) {
        if (typeof value !== "string") {
            return createError(field, "string");
        }
        if (checkLowerCase && value !== value.toLowerCase()) {
            return createError(field, "lowercase");
        }
        if (checkSpaceAtFirstAndLast && hasLeadingOrTrailingSpace(value)) {
            return createError(field, "space");
        }
        if (maxLength && value.length > maxLength) {
            return createError(field, "maxLength", maxLength);
        }
        if (minLength && value.length < minLength) {
            return createError(field, "minLength", minLength);
        }
        if (alphanumeric && !/^[a-zA-Z0-9\s]*$/.test(value)) {
            return createError(field, "alphanumeric");
        }
        return await validateUnique(Model, field, value, unique) || await validateCustom(value, customValidation, field);
    }
    return null;
};

const validateNumberField = async (Model, field, options, value) => {
    const { required, minValue, maxValue, unique, customValidation } = options;

    if (required && (value === undefined || value === null)) {
        return createError(field, "required");
    }
    if (value !== undefined && typeof value !== "number") {
        return createError(field, "number");
    }
    if (maxValue !== undefined && value > maxValue) {
        return createError(field, "maxValue", maxValue);
    }
    if (minValue !== undefined && value < minValue) {
        return createError(field, "minValue", minValue);
    }
    return await validateUnique(Model, field, value, unique) || await validateCustom(value, customValidation, field);
};

const validateDateField = async (Model, field, options, value) => {
    const { required, unique, customValidation } = options;

    if (required && !value) {
        return createError(field, "required");
    }
    if (value && isNaN(new Date(value).getTime())) {
        return createError(field, "date");
    }
    return await validateUnique(Model, field, value, unique) || await validateCustom(value, customValidation, field);
};

const validateObjectField = async (Model, field, options, value) => {
    const { required, unique, customValidation } = options;

    if (required && !value) {
        return createError(field, "required");
    }
    if (value && typeof value !== "object") {
        return createError(field, "object");
    }
    return await validateUnique(Model, field, value, unique) || await validateCustom(value, customValidation, field);
};

const validateArrayField = async (Model, field, options, value) => {
    const { required, minLength, maxLength, checkDuplicates, unique, customValidation } = options;

    if (required && (!value || !Array.isArray(value))) {
        return createError(field, "required");
    }
    if (Array.isArray(value)) {
        if (maxLength && value.length > maxLength) {
            return createError(field, "maxLength", maxLength);
        }
        if (minLength && value.length < minLength) {
            return createError(field, "minLength", minLength);
        }
        if (checkDuplicates && hasDuplicates(value)) {
            return createError(field, "duplicates");
        }
    }
    return await validateUnique(Model, field, value, unique) || await validateCustom(value, customValidation, field);
};

// Helper Functions
const createError = (field, type, param) => {
    let message;
    switch (type) {
        case "required":
            message = `Failed! ${field} field is required`;
            break;
        case "string":
            message = `Failed! ${field} must be a string`;
            break;
        case "lowercase":
            message = `Failed! ${field} must be in lowercase`;
            break;
        case "space":
            message = `Failed! ${field} should not have space at first or last`;
            break;
        case "maxLength":
            message = `Failed! ${field} should not exceed ${param} characters`;
            break;
        case "minLength":
            message = `Failed! ${field} should not be less than ${param} characters`;
            break;
        case "alphanumeric":
            message = `Failed! ${field} should contain only alphanumeric characters`;
            break;
        case "number":
            message = `Failed! ${field} must be a number`;
            break;
        case "date":
            message = `Failed! ${field} must be a valid date`;
            break;
        case "object":
            message = `Failed! ${field} must be an object`;
            break;
        case "duplicates":
            message = `Failed! Duplicate entries found in ${field}`;
            break;
        default:
            message = `Failed! Validation failed for ${field}`;
    }
    return { error: { message, errorInfo: null } };
};

const validateUnique = async (Model, field, value, unique) => {
    if (unique) {
        const exists = await Model.findOne({ [field]: value, isDeleted: false });
        if (exists) {
            return createError(field, "unique");
        }
    }
    return null;
};

const validateCustom = async (value, customValidation, field) => {
    if (customValidation) {
        try {
            return await customValidation(value);
        } catch (error) {
            return createError(field, "custom", error.message);
        }
    }
    return null;
};

const hasLeadingOrTrailingSpace = (value) => {
    return value.charAt(0) === " " || value.charAt(value.length - 1) === " ";
};

const hasDuplicates = (array) => {
    const idSet = new Set();
    for (const id of array) {
        if (idSet.has(id)) {
            return true; // Found a duplicate
        }
        idSet.add(id);
    }
    return false;
};

// Export the validation functions
module.exports = {
    validateTextField,
    validateNumberField,
    validateDateField,
    validateObjectField,
    validateArrayField,
};