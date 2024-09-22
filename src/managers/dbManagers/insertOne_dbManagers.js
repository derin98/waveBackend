const insertOneDbManager = async (Model, data) => {
    return Model.create(data);
};

module.exports = {insertOneDbManager};
