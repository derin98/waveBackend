const isValidEmail = (email) => {

    const maxLength = 320;
    const minLength = 5;

    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // List of supported email suffixes
    const validSuffixes = [
        ".com",
        ".org",
        ".net",
        ".info",
        ".biz",
        ".name",
        ".mobi",
        ".jobs",
        ".travel",
        ".gov",
        ".edu",
        ".mil",
        ".int",
        ".us",
        ".uk",
        ".cn",
        ".jp",
        ".de",
        ".in",
        ".fr",
        ".ru",
        ".br",
        ".au",
        ".ca",
        ".mx",
        ".it",
        ".es",
        ".nl",
        ".ch",
        ".se",
        ".no",
        ".kr",
        ".sa",
        ".ae",
        ".za",
        ".xyz",
        ".club",
        ".online",
        ".site",
        ".blog",
        ".store",
        ".app",
        ".tech",
        ".io",
        ".ai",
        ".dev"
    ];

    // Validate email length
    if (email.length < minLength || email.length > maxLength) {
        throw new Error(`Email length must be between ${minLength} and ${maxLength} characters.`);
    }

    // Validate email format
    if (!emailRegex.test(email)) {
        throw new Error("Email format is invalid.");
    }

    // Validate email suffix
    const hasValidSuffix = validSuffixes.some((suffix) => email.endsWith(suffix));
    if (!hasValidSuffix) {
        throw new Error("Email must end with a valid domain suffix.");
    }

    return true;
};


module.exports = { isValidEmail };