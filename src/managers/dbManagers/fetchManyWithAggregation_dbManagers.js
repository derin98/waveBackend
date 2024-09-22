const fetchManyWithAggregationDbManager = async(
    Model,
    query,
    limit = null,
    skip = null,
    sort = {},
    selectFields = "",
    populateFields = []
) => {
    // Start building the query object
    let queryObject
    if (limit > 0) {
        queryObject = Model.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            ;
    }
    else {
        queryObject = Model.find(query).sort(sort);
    }

    // Apply field selection if specified
    if (selectFields) {
        queryObject = queryObject.select(selectFields);
    }

    // Apply population if specified
    if (populateFields.length > 0) {
        populateFields.forEach((populateField) => {
            const { path, select } = populateField;
            console.log("path", path)
            console.log("populateField", populateField.path)

            if (Model.schema.path(path)) {
                queryObject = queryObject.populate({
                    path,
                    select: select || "_id generalDetails.name name", // Use provided select or an empty string
                    options: {
                        lean: true,
                        transform: (doc) => {
                            if (!doc) return null; // Return null if doc is null
                            // Rename _id to id within the populated item
                            const { _id, ...rest } = doc;
                            return { ...rest, id: _id };
                        }
                    }
                });
            }
        });
    }

    // Execute the query and get results
    const results = await queryObject.lean();
    return results;

    // //To be handeled in module manager
    // // Transform the results to replace _id with id
    // return results.map(result => {
    //     const { _id, ...rest } = result;
    //     return { ...rest, id: _id };
    // });
}

module.exports = {fetchManyWithAggregationDbManager} ;