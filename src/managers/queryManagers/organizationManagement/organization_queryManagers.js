const { constants: { userManagementConstants: { userConstants: { userRoles, departments, designations } } } } = require("../../../utils")
const { insertOneDbManager: { insertOneDbManager, datumNew_dbManagers, datumSave_dbManagers } } = require("../../dbManagers")
const { userManagementModels: { userModel: { Users }} } = require("../../../models")

const createUser_manager = async (req) => {
    try {
        const datum = await insertOneDbManager(Users, req.userCreateObject)
        return datum;
    } catch (error) {
        throw error;
    }

}


module.exports = { createUser_manager }