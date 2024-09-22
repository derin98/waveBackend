const aggregationDbManager = async (Model, aggregationPipeline) => {
    return Model.aggregate(aggregationPipeline);
};

module.exports = {aggregationDbManager};