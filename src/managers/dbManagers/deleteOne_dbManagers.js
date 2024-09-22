const deleteOneDbManager = async (Model, query) => {
    // Delete a single document using deleteOne
    return Model.deleteOneDbManager(query);
}

module.exports = {deleteOneDbManager}