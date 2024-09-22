const updateOneDbManager = async (Model, query, updateObject) => {
    // Update a single document using updateOne
    return Model.updateOne(query, updateObject);
}

module.exports = {updateOneDbManager}