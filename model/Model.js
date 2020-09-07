const mongoose = require('mongoose');

const ModelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    modelBodyId: {
        type: String,
        required: true
    },
})

const Model = module.exports = mongoose.model('Model', ModelSchema);

module.exports.getModelByName = (name, cb) => {
    const query = {name: name};
    Model.findOne(query, cb);
}

module.exports.getAllByModelBodyId = (modelBodyId, cb) => {
    const query = {modelBodyId: modelBodyId};
    Model.find(query, cb);
}

