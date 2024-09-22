// const { dbManagers: { fetchOneWithAggregationDbManager } } = require("..");
const { fetchOneWithAggregationDbManager } = require('../dbManagers/fetchOneWithAggregation_dbManagers');


const fetchSingleCommonQueryManager = async (Model, fieldName, fieldValue, query = {}, fieldMappings = {}, populateFields = [], selectFields = []) => {

    try {
        // Ensure that if there are any populateFields, they should also be in selectFields
        const updatedSelectFields = Array.from(new Set([...selectFields, ...populateFields]));

        const datum = await fetchOneWithAggregationDbManager(Model, fieldName, fieldValue, query, fieldMappings, populateFields, updatedSelectFields);

        if (datum) {
            const { _id, ...rest } = datum;
            return { id: _id, ...rest };
        } else {
            return null;
        }

    } catch (error) {
        throw error;
    }
};

module.exports = { fetchSingleCommonQueryManager };