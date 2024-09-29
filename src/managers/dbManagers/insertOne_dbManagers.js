const insertOneDbManager = async (Model, data) => {
    return Model.create(data);
};

const datumNew_dbManagers = async (Model, data) => {

    new Model(data);
    return datum;
}

const datumSave_dbManagers = async (Model, data) => {
    await datum.save();
    return datum;
}

module.exports = { insertOneDbManager, datumNew_dbManagers, datumSave_dbManagers };
