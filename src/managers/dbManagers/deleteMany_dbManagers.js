const deleteManyDbManager = async (Model, query) => {
    // Delete multiple documents using deleteMany
    return Model.deleteManyDbManager(query);
}

module.exports = {deleteManyDbManager}