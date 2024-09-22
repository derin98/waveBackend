const updateManyDbManager = async (Model, query, updateObject) => {
    // Update multiple documents using updateMany
    return Model.updateMany(query, updateObject);
}

module.exports = {updateManyDbManager}