exports.createPermissionObject = (req) => {
    return {
        name: req.body.name,
        permissionGroupId: req.params.id,
        businessUnitId: req.businessUnitId,
        isEnabled: req.body.isEnabled ? req.body.isEnabled : true,
        createdBy: req.userId,
        updatedBy: req.userId
    };
}

exports.updatePermissionObject = (req) => {
    const updateObject = {
        updatedBy: req.userId
    };
    if (req.body.name) {
        updateObject.name = req.body.name;
    }
    if (req.body.isEnabled !== undefined) {
        updateObject.isEnabled = req.body.isEnabled;
    }
    return updateObject;
}
