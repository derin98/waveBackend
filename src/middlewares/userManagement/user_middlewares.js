// middlewares/userManagement/user_middlewares.js
const { responseManagers: { errorResponseManager: { errorResponse } } } = require("../../managers");
const { constants: { userManagementConstants: { userConstants: { userRoles, departments, designations, userStatus } } } } = require("../../utils");

const validateUserRole = (userRole) => {
    if (!userRoles[userRole]) {
        throw new Error(`Invalid User Role: ${userRole}`);
    }
    return true;
};

const validateDepartment = (department) => {
    if (!departments[department]) {
        throw new Error(`Invalid Department: ${department}`);
    }
    return true;
};

const validateUserStatus = (status) => {
    if (!userStatus[status]) {
        throw new Error(`Invalid User Status: ${status}`);
    }
    return true;
};

const validateDesignationForDepartment = (designation, department) => {
    if (!(designations[department] && designations[department][designation])) {
        throw new Error(`Invalid Designation: ${designation} for Department: ${department}`);
    }
    return true;
};

module.exports = {
    validateUserRole,
    validateDepartment,
    validateUserStatus,
    validateDesignationForDepartment
};