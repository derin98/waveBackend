const { aggregationDbManager } = require("./aggregation_dbManagers");



const fetchOneWithAggregationDbManager = async (
    Model,
    fieldName,  // New parameter for field name
    fieldValue, // New parameter for field value
    query = {},
    fieldMappings = {},
    populateFields = [],
    selectFields = []
) => {
    try {
        // Adjust the $match stage to use fieldName and fieldValue
        const pipeline = [{ $match: { [fieldName]: fieldValue, ...query } }];

        if (selectFields.length > 0) {
            pipeline.push({
                $project: Object.fromEntries(selectFields.map((field) => [field, 1])),
            });
        }

        populateFields.forEach((field) => {
            const mapping = fieldMappings[field];
            if (!mapping) {
                throw new Error(`Please enter correct Fieldname: ${field}`);
            }
            const { localField, collection, fieldsToInclude, isArray, subFields } = mapping;

            const lookupPipeline = [
                { $match: { $expr: { $in: [`$_id`, `$$localIds`] } } },
                { $addFields: { id: `$_id` } },
                {
                    $project: fieldsToInclude.reduce((acc, field) => {
                        acc[field] = 1;
                        return acc;
                    }, { _id: 0, id: 1 }) // Ensure 'id' is included
                }
            ];

            // Handle sub-fields
            if (subFields && subFields.length > 0) {
                subFields.forEach((subField) => {
                    const { localField: subLocalField, collection: subCollection, fieldsToInclude: subFieldsToInclude, isArray: subIsArray } = subField;

                    const subLookupPipeline = [
                        { $match: { $expr: { $eq: [`$_id`, `$$subLocalId`] } } },
                        { $addFields: { id: `$_id` } },
                        {
                            $project: subFieldsToInclude.reduce((acc, field) => {
                                acc[field] = 1;
                                return acc;
                            }, { _id: 1, id: 1 }) // Ensure 'id' is included
                        }
                    ];

                    lookupPipeline.push(
                        {
                            $lookup: {
                                from: subCollection,
                                let: { subLocalId: `$${subLocalField}` },
                                pipeline: subLookupPipeline,
                                as: subLocalField,
                            },
                        },
                        {
                            $addFields: {
                                [subLocalField]: {
                                    $cond: {
                                        if: { $eq: [{ $type: `$${subLocalField}` }, "array"] },
                                        then: subIsArray ? `$${subLocalField}` : { $arrayElemAt: [`$${subLocalField}`, 0] },
                                        else: `$${subLocalField}`
                                    }
                                }
                            }
                        }
                    );
                });
            }

            pipeline.push(
                {
                    $lookup: {
                        from: collection,
                        let: {
                            localIds: {
                                $cond: {
                                    if: { $eq: [{ $type: `$${localField}` }, "array"] },
                                    then: `$${localField}`,
                                    else: { $cond: { if: { $ne: [`$${localField}`, null] }, then: [`$${localField}`], else: [] } }
                                }
                            }
                        },
                        pipeline: lookupPipeline,
                        as: localField,
                    },
                }
            );

            if (isArray) {
                pipeline.push(
                    {
                        $addFields: {
                            [localField]: {
                                $cond: {
                                    if: { $eq: [{ $type: `$${localField}` }, "array"] },
                                    then: `$${localField}`,
                                    else: [`$${localField}`]
                                }
                            }
                        }
                    }
                );
            } else {
                pipeline.push(
                    {
                        $addFields: {
                            [localField]: {
                                $cond: {
                                    if: { $and: [{ $eq: [{ $type: `$${localField}` }, "array"] }, { $gt: [{ $size: `$${localField}` }, 1] }] },
                                    then: `$${localField}`,
                                    else: { $arrayElemAt: [`$${localField}`, 0] }
                                }
                            }
                        }
                    }
                );
            }
        });

        const result = await aggregationDbManager(Model, pipeline);
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error("Error in building aggregation pipeline:", error);
        throw error;
    }
}

module.exports = {fetchOneWithAggregationDbManager};
