const bulkWriteDbManager = async (Model, bulkUpdateOperations) => {
    return Model.bulkWrite(bulkUpdateOperations);
};

module.exports = {bulkWriteDbManager};