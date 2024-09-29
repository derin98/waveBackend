// const fetchDataQueryConstructor = (Model, reqQuery) => {

//    const page = reqQuery.page || 1;
//    const limit = reqQuery.limit || 10;
//     const sortBy = reqQuery.sortBy || "createdAt";
//     const sortOrder = reqQuery.sortOrder === "asc" ? 1 : -1;
//     const sort = { [sortBy]: sortOrder };

//     // take all keys of query object except page, limit, sortBy, sortOrder but only the keys that are present in model schema keys and can be plural form or that key
//     const query = {};
//     Object.keys(reqQuery).forEach((key) => {
//         if (
//             Model.schema.paths[key] &&
//             Model.schema.paths[key].instance === "String" &&
//             key !== "page" &&
//             key !== "limit" &&
//             key !== "sortBy" &&
//             key !== "sortOrder"
//         ) {
//             query[key] = reqQuery[key];
//         }
//     });
  

//     // If any of the key in plural form then separate them and use $in
//     const queryKeys = Object.keys(query);
//     queryKeys.forEach((key) => {
//         if (key.endsWith("s")) {
//             query[key] = { $in: query[key].split(",") };
//             // remove s
//             const newKey = key.slice(0, -1);
//             query[newKey] = query[key];
//             delete query[key];

//         }

//     });


// };


// module.exports = { isValidEmail };





const pluralize = require('pluralize');

const constructQueryParams = (reqQuery, Model) => {
    try {
        const page = parseInt(reqQuery.page) || 1;
        const limit = parseInt(reqQuery.limit) || 3;
        const sortBy = reqQuery.sortBy || "createdAt";
        const sortOrder = reqQuery.sortOrder === "asc" ? 1 : -1;
        const sort = { [sortBy]: sortOrder };

        // Calculate skip
        const skip = (page - 1) * limit;

        const query = {};

        // Handle specific query parameters
        if (reqQuery.ids) {
            query._id = { $in: reqQuery.ids.split(",") };
        }

        if (reqQuery.noLimit === "true" || reqQuery.noLimit === "yes" || reqQuery.noLimit === "1") {
            limit = 0;
        }

        if (reqQuery.name || reqQuery.names) {
            if (reqQuery.names) {
                let names = reqQuery.names.split(",")
                // implement regex for names
                query.name = { $in: names.map(name => new RegExp(name, "i")) };
            } else {
                query.name = { $regex: new RegExp(reqQuery.name, "i") };
            }
        }

        // Handle other query parameters based on Model schema
        Object.keys(reqQuery).forEach((key) => {
            if (
                Model.schema.paths[key] &&
                Model.schema.paths[key].instance === "String" &&
                key !== "page" &&
                key !== "limit" &&
                key !== "sortBy" &&
                key !== "sortOrder" &&
                key !== "noLimit" &&
                key !== "ids" &&
                key !== "name" &&
                key !== "names" &&
                key !== "password"
            ) {
                query[key] = reqQuery[key];
            }
        });

        // Handle pluralization and arrays
        Object.keys(query).forEach((key) => {
            const singularKey = pluralize.singular(key);

            // Check if the key is plural and exists in the schema as singular
            if (key !== singularKey && Model.schema.paths[singularKey]) {
                query[singularKey] = { $in: query[key].split(",") };
                delete query[key];
            }
        });

        return { query, sort, page, limit, skip };

    } catch (error) {
        console.error("Error constructing query:", error);
        // Handle or throw the error as needed
        throw error;
    }
};

module.exports = { constructQueryParams };
