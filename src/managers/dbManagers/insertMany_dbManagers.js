const insertManyDbManager = async (Model, data) => {
    return Model.insertMany(data);
};

module.exports = {insertManyDbManager};
