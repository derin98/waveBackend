const { constants: { userManagementConstants: { userConstants: { userRoles, departments, designations } } } } = require("../../../utils")
const { insertOneDbManager: { insertOneDbManager, datumNew_dbManagers, datumSave_dbManagers } } = require("../../dbManagers")
const { userManagementModels: { userModel: { Users }} } = require("../../../models")

const createUser_queryManager = async (createObj) => {
    try {
        const datum = await insertOneDbManager(Users, createObj)
        datum.set('authentication', undefined);
        datum.set('organizations', undefined);
        return datum
    } catch (error) {
        throw error;
    }

}


module.exports = { createUser_queryManager }