const { getCountries, getCountryCallingCode } = require('libphonenumber-js');

// Function to list all countries with their ISO codes and calling codes
const listAllCountriesWithCallingCodes = () => {
    return getCountries().map(country => ({
        countryCode: country, // ISO 3166-1 alpha-2 country code
        callingCode: getCountryCallingCode(country) // International calling code
    }));
};

const countriesWithCallingCodes = listAllCountriesWithCallingCodes();

// Create an object with country codes as both keys and values
const countryCodesObject = countriesWithCallingCodes.reduce((acc, country) => {
    acc[country.countryCode] = country.countryCode;
    return acc;
}, {});



module.exports = { 
    countryCodesObject,
    countriesWithCallingCodes,
 };