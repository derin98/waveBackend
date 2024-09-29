const commonQueryManager = require("./common_queryManager");
const userManagementQueryManager = require("./userManagement/index");
const organizationManagementQueryManager = require("./organizationManagement/index");


module.exports = {
    commonQueryManager,
    userManagementQueryManager,
    organizationManagementQueryManager
}