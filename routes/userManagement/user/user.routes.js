const userController = require('../../../controllers/userManagement/user/user.controller');
const { verifyUserReq, verifyBusinessUnitAfterAuth, authJwt,
    verifyDepartmentReqBody,
    verifyUserTypeReqBody,
    verifyDesignationReqBody,
    verifyTeamReqBody
} = require("../../../middlewares");
const verifyTimeStamp = require("../../../middlewares/common/verifyTimeStamp");

module.exports = function (app) {

    // app.post("/api/v1/users", [
    //     // authJwt.verifyToken,
    //     verifyBusinessUnitAfterAuth.verifyBusinessUnit,
    //     verifyDepartmentReqBody.validateDepartment, verifyUserTypeReqBody.validateUserType,
    //     verifyDesignationReqBody.validateDesignation, verifyTeamReqBody.validateTeam,
    //     verifyUserReq.validateCreateUserRequest
    // ], userController.createUser);

    app.get("/api/v1/users", [
            authJwt.verifyToken,
            verifyBusinessUnitAfterAuth.verifyBusinessUnit,
            verifyDepartmentReqBody.validateDepartmentsFromQuery,
            verifyUserTypeReqBody.validateUserTypesFromQuery,
            verifyDesignationReqBody.validateDesignationsFromQuery,
            verifyTeamReqBody.validateTeamsFromQuery,
            verifyUserReq.validateReportsTosFromQuery,
            verifyTimeStamp.validateCreatedAtFromQueryForSearch,
            verifyTimeStamp.validateUpdatedAtFromQueryForSearch
        ],
        userController.getAllUsers);

    app.get("/api/v1/users/:user", [ authJwt.verifyToken, verifyBusinessUnitAfterAuth.verifyBusinessUnit, verifyUserReq.validateUser], userController.getUser);

    app.patch("/api/v1/users/:user/enable", [ authJwt.verifyToken, verifyBusinessUnitAfterAuth.verifyBusinessUnit, verifyUserReq.validateUser], userController.enableUser);

    app.patch("/api/v1/users/:user/disable", [ authJwt.verifyToken, verifyBusinessUnitAfterAuth.verifyBusinessUnit, verifyUserReq.validateUser], userController.disableUser);

    app.patch("/api/v1/users/enable", [ authJwt.verifyToken, verifyBusinessUnitAfterAuth.verifyBusinessUnit, verifyUserReq.validateUsers], userController.enableUsers);

    app.patch("/api/v1/users/disable", [ authJwt.verifyToken, verifyBusinessUnitAfterAuth.verifyBusinessUnit, verifyUserReq.validateUsers], userController.disableUsers);

    app.delete("/api/v1/users/:user", [ authJwt.verifyToken, verifyBusinessUnitAfterAuth.verifyBusinessUnit, verifyUserReq.validateUser], userController.deleteUser);

    app.delete("/api/v1/users/", [ authJwt.verifyToken, verifyBusinessUnitAfterAuth.verifyBusinessUnit, verifyUserReq.validateUsers], userController.deleteUsers);

    app.put("/api/v1/users/:user", [ authJwt.verifyToken, verifyBusinessUnitAfterAuth.verifyBusinessUnit,
        verifyUserReq.validatePreUpdateUserRequest, verifyUserReq.validateUserAndReturnObj,
        verifyDepartmentReqBody.validateDepartment, verifyUserTypeReqBody.validateUserType,
        verifyDesignationReqBody.validateDesignation, verifyTeamReqBody.validateTeam,
         ], userController.updateUser);
//     app.get("/api/v1/users/:userId", [authJwt.verifyToken, authJwt.isAdmin], const userController.findById);
//
//     app.put("/api/v1/users/:userId", [authJwt.verifyToken, authJwt.isAdmin, verifyBusinessUnitRequestBody.validateCreateBusinessUnitRequestBody], constbusinessUnitController.update);
//
}