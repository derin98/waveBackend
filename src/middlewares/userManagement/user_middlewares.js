// middlewares/userManagement/user_middlewares.js
const { responseManagers: { errorResponseManager: { errorResponse } } } = require("../../managers");
const { constants: { userManagementConstants: { userConstants: { userRoles, departments, designations } } } } = require("../../utils");

const validateUserRole = (userRole) => {
    return !!userRoles[userRole];
};

const validateDepartment = (department) => {
    return !!departments[department];
};

const validateDesignationForDepartment = (designation, department) => {
    return !!(designations[department] && designations[department][designation]);
};

module.exports = {
    validateUserRole,
    validateDepartment,
    validateDesignationForDepartment
};
