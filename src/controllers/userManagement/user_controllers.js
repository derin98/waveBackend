const { queryManagers: { userManagementQueryManager: { userQueryManager: { createUser_queryManager } } } } = require("../../managers");
const { responseManagers: { errorResponseManager: { errorResponse } , successResponseManager: { successResponse }}} = require("../../managers");

const createUser_controller = async (req, res) => {
    try {

        const datum = await createUser_queryManager(req.userCreateObject);
        //delete datum.authentication and datum.organizations
        console.log(datum)

        successResponse(res, "User created successfully", 201, datum);


    } catch (error) {

        errorResponse(res, error.message, 500);

    }
}

module.exports = {
    createUser_controller
}