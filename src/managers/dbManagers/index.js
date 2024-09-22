const aggregationDbManager = require("./aggregation_dbManagers");
const fetchOneWithAggregationDbManager = require("./fetchOneWithAggregation_dbManagers");
const countDocumentsDbManager = require("./countDocuments_dbManagers");
const updateOneDbManager = require("./updateOne_dbManagers");
const updateManyDbManager = require("./updateMany_dbManagers");
const deleteOneDbManager = require("./deleteOne_dbManagers");
const deleteManyDbManager = require("./deleteMany_dbManagers");
const bulkWriteDbManager = require("./bulkWrite_dbManagers");
const fetchManyWithAggregationDbManager = require("./fetchManyWithAggregation_dbManagers");
const insertOneDbManager = require("./insertOne_dbManagers");
const insertManyDbManager = require("./insertMany_dbManagers");




module.exports = {
    aggregationDbManager,
    fetchOneWithAggregationDbManager,
    countDocumentsDbManager,
    updateOneDbManager,
    updateManyDbManager,
    deleteOneDbManager,
    deleteManyDbManager,
    bulkWriteDbManager,
    fetchManyWithAggregationDbManager,
    insertOneDbManager,
    insertManyDbManager

};
