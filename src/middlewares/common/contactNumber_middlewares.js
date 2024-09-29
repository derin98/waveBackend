const { parsePhoneNumberFromString } = require('libphonenumber-js');
const { constants: { countryAndCallingCodeConstants: { countryCodesObject } } } = require("../../utils");

const isValidContactNumberBasedOnCountryCode = (contactNumber, countryCode) => {
    try {
        if (typeof contactNumber === 'number') {
            contactNumber = contactNumber.toString();
        }

        if (typeof contactNumber !== 'string') {
            throw new Error('Contact number must be a string or a number.');
        }

        const phoneNumber = parsePhoneNumberFromString(contactNumber, countryCode);

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
    // if (!isValidContactNumberBasedOnCountryCode(contactNumber, countryCode)) {
    //     throw new Error("Invalid Contact Number");
    // }
    try {
        (isValidContactNumberBasedOnCountryCode(contactNumber, countryCode))
    } catch (error) {
        throw error;
    }
}

const validateCountryCode = (countryCode) => {
    if (!countryCodesObject[countryCode]) {
        throw new Error("Invalid Country Code");
    }
}

module.exports = { validatePhoneNumberBasedOnCountryCode, validateCountryCode, isValidContactNumberBasedOnCountryCode }