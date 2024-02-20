/**
 * This file will contain the middlewares for valdiating the designation request body
 */
const DesignationDbOperations = require('../../../dbOperations/mongoDB/organizationManagement/designation/designation.dbOperations');
const apiResponseHandler = require("../../../utils/responseHandlers/apiResponseHandler.js");
const BusinessUnitDbOperations = require("../../../dbOperations/mongoDB/organizationManagement/businessUnit/businessUnit.dbOperations");


validateCreateDesignationRequestBody = async (req, res, next) => {
    // Validate request
    if (!req.body.name || typeof req.body.name !== 'string') {
        return apiResponseHandler.errorResponse(
            res,
            "Designation name must be a non-empty string",
            400,
            null
        );
    }

    if (!req.businessUnitId) {
        return apiResponseHandler.errorResponse(
            res,
            "BusinessUnit Id must be a non-empty string",
            400,
            null
        );
    }
    // Check if the provided name already exists in the database
    const existingNameDesignation = await DesignationDbOperations.checkExistingNameForUserType(req.body.name, req.params.id, req.businessUnitId);
    if (existingNameDesignation) {
        return apiResponseHandler.errorResponse(
            res,
            "Failed! Designation name already exists for the business unit",
            400,
            null
        );
    }

    if (req.body.isEnabled !== undefined) {
        if (typeof req.body.isEnabled !== 'boolean') {
            return apiResponseHandler.errorResponse(
                res,
                "Failed! Designation isEnabled should be a boolean",
                400,
                null
            );
        }
    }
    next();
}

validateUpdateDesignationRequestBody = async (req, res, next) => {
    // Validate request
    if (req.body.name){
        if (typeof req.body.name !== 'string') {
            return apiResponseHandler.errorResponse(
                res,
                "Designation name must be a non-empty string",
                400,
                null
            );
        }

        const existingNameDesignation = await DesignationDbOperations.checkExistingNameForUserType(req.body.name, req.params.id, req.businessUnitId);
        if (existingNameDesignation) {
            return apiResponseHandler.errorResponse(
                res,
                "Failed! Designation name already exists for the business unit",
                400,
                null
            );
        }
        if (req.body.isEnabled !== undefined) {
            if (typeof req.body.isEnabled !== 'boolean') {
                return apiResponseHandler.errorResponse(
                    res,
                    "Failed! Designation isEnabled should be a boolean",
                    400,
                    null
                );
            }
        }
    }
    next();
}

validateDesignationId = async (req, res, next) => {
    if (!req.params.id || typeof req.params.id !== 'string') {
        return apiResponseHandler.errorResponse(
            res,
            "Designation id must be a non-empty string",
            400,
            null
        );
    }
    let checkExistingDesignation = await DesignationDbOperations.checkExistingDesignationId(req.params.id, req.businessUnitId);
    if (checkExistingDesignation) {
        next();
    } else {
        return apiResponseHandler.errorResponse(
            res,
            "Failed! Designation does not exist",
            400,
            null
        );
    }
}

validateDesignationIds = async (req, res, next) => {

    if (!req.body.ids || !Array.isArray(req.body.ids) || req.body.ids.length === 0) {
        return apiResponseHandler.errorResponse(
            res,
            "Designation ids must be a non-empty array of strings",
            400,
            null
        );
    }
    for (let i = 0; i < req.body.ids.length; i++) {
        if (typeof req.body.ids[i] !== 'string') {
            return apiResponseHandler.errorResponse(
                res,
                "Designation ids must be a non-empty array of strings",
                400,
                null
            );
        }
    }
    let invalidDesignationIds = await DesignationDbOperations.returnInvalidDesignationIds(req.body.ids, req.businessUnitId);
    if (invalidDesignationIds.length > 0) {
        return apiResponseHandler.errorResponse(
            res,
            "Failed! Invalid Designation ids",
            400,
            { invalidDesignationIds }
        );
    }
    next();
}

const verifyDesignationReqBody = {
    validateCreateDesignationRequestBody: validateCreateDesignationRequestBody,
    validateUpdateDesignationRequestBody: validateUpdateDesignationRequestBody,
    validateDesignationId: validateDesignationId,
    validateDesignationIds: validateDesignationIds
};


module.exports = verifyDesignationReqBody
