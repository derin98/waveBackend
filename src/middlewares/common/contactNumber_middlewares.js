const { parsePhoneNumberFromString } = require ('libphonenumber-js');
const { responseManagers: { errorResponseManager: { errorResponse }, successResponseManager: { successResponse } } } = require("../../managers");
const { constants: { countryAndCallingCodeConstants: { countryCodesObject }} } = require("../../utils");


const isValidContactNumberBasedOnCountryCode = (contactNumber, countryCode) => {
    try {
        // Convert contact number to string if it is a number
        if (typeof contactNumber === 'number') {
            contactNumber = contactNumber.toString();
        }

        // Ensure contact number is a valid string
        if (typeof contactNumber !== 'string') {
            throw new Error('Contact number must be a string or a number.');
        }

        // Parse the phone number using the provided contact number and country code
        const phoneNumber = parsePhoneNumberFromString(contactNumber, countryCode);

        // Check if the phone number is valid
        if (phoneNumber && phoneNumber.isValid()) {
            return true;
        } else {
            throw new Error("Invalid contact number based on the provided country code.");
        }
    } catch (error) {
        console.error('Error parsing phone number:', error.message);
        throw error;
    }
};

const validatePhoneNumberBasedOnCountryCode = (contactNumber, countryCode) => {
    if (isValidContactNumberBasedOnCountryCode(contactNumber, countryCode)) {
        return;
    }
    else {
        throw new Error("Invalid Contact Number");
    }
    
}

const validateCountryCode = (countryCode) => {
    if (countryCodesObject[countryCode]) {
        return;
    }
    else {
        throw new Error( "Invalid Country Code");
    }
}



module.exports = { validatePhoneNumberBasedOnCountryCode, validateCountryCode, isValidContactNumberBasedOnCountryCode }